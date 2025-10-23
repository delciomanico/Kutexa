import * as Tesseract from 'tesseract.js'
import * as path from 'path'
// importar a função pdfParse (conforme documentação)
import { PDFParse } from 'pdf-parse';
import { askLLM } from './llmClient.js'

export interface MetadadoFatura {
  id?: string;
  fornecedor?: string;
  valorTotal?: number;
  data?: string;
  origemArquivo?: string;
  legivel?: true | false;
}

export interface TransacaoExtrato {
  id?: string | null;
  data: string | null;
  valor: number | null;
  origem?: string | null;
  descricao?: string | null;
  legivel: true | false
}

type Correspondencia = {
  fatura: MetadadoFatura
  transacao: TransacaoExtrato | null
  faturaId: string | number | undefined
  transacaoId?: string | number
  similaridade: number
  observacoes?: string[]
}

export async function extrairTextoOCR(caminho: string): Promise<string> {
  const ext = path.extname(caminho).toLowerCase()
  if (ext === '.pdf') {
    return await extrairTextoPDF(caminho)
  }

  // Se não for PDF, aplicar OCR em imagem
  const resultado = await Tesseract.recognize(caminho, 'por')
  return resultado.data.text
}

export async function extrairTextoPDF(caminho: string): Promise<string> {
  try {

    const parser = new PDFParse({ url: caminho });

    const result = await parser.getText();
    return result?.text ?? '';
  } catch (err) {
    console.error('Erro ao extrair texto do PDF:', caminho, err)
    return ''
  }
}

export async function extrairMetadados(texto: string, origemArquivo: string): Promise<MetadadoFatura> {
  const prompt = `
Você é um extrator de dados inteligente. Abaixo está o conteúdo de uma fatura ou documento financeiro. Extraia os seguintes campos:

- Nome ou razão social do fornecedor
- Data da fatura (formato dd/mm/aaaa)
- Valor total da fatura (em kwanzas)

Retorne os dados no seguinte formato JSON:
{
  "fornecedor": "...",
  "data": "...",
  "valorTotal": ...,
  "origemArquivo": "...",
  "legivel": true
}
Caso nao consiga pegar os dados chaves Retorna o seguinte JSON
{
  "fornecedor": null,
  "data": null,
  "valorTotal": null,
  "origemArquivo": "...",
  "legivel": false
}

Texto do documento:
"""
${texto}
"""
`

  try {
    const resposta = await askLLM(prompt)

    const dados = JSON.parse(resposta)
    return {
      ...dados,
      origemArquivo,
    }
  } catch (e) {
    console.error('Erro ao interpretar resposta do modelo:', e)
    return {
      fornecedor: undefined,
      data: undefined,
      valorTotal: undefined,
      origemArquivo,
      legivel: false,
    }
  }
}

const TIMEOUT_MS = 10000 // tempo limite para resposta da IA

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Tempo limite excedido')), ms)
    ),
  ])
}

function extrairFallbackLocal(texto: string): TransacaoExtrato[] {
  const linhas = texto.split('\n').map((linha) => linha.trim()).filter(Boolean)
  const transacoes: TransacaoExtrato[] = []

  for (const linha of linhas) {
    const match = linha.match(/(\d{2}\/\d{2}\/\d{4})\s+R?\$?\s?([\d.,]+)\s+(.+)/)
    if (match) {
      const [, data, valorTexto, descricao] = match
      const valor = parseFloat(valorTexto.replace(/\./g, '').replace(',', '.'))

      transacoes.push({
        origem: descricao.trim(),
        data,
        valor,
        descricao: descricao.trim(),
        legivel: true,
      })
    }
  }

  return transacoes
}

export async function lerExtrato(caminho: string): Promise<TransacaoExtrato[]> {
  try {
    // usar pdfParse a partir do buffer
    const parser = new PDFParse({ url: caminho });

    const result = await parser.getText();
    const texto = result?.text ?? ''
    console.log('Texto extraído do extrato:', texto)
    const prompt = `
Você é um extrator de dados inteligente. Abaixo está o conteúdo de um extrato ou documento financeiro. Extraia todas as transações com os seguintes campos:

- Nome ou razão social da origem
- Data da transação (formato dd/mm/aaaa)
- Valor da transação (em kwanzas)

Retorne um array JSON com este formato:
[
  {
    "origem": "...",
    "data": "...",
    "valor": ...,
    "descricao": "...",
    "legivel": true
  }
]

Caso não consiga extrair transações, retorne:
[
  {
    "origem": null,
    "data": null,
    "valor": null,
    "descricao": "Falha na extração",
    "legivel": false
  }
]

Texto do documento:
"""
${texto}
"""
`

    let transacoes: TransacaoExtrato[]
    try {
      const resposta = await withTimeout(askLLM(prompt), TIMEOUT_MS)

      //console.log('Resposta da IA para extrato:', resposta)
      transacoes = JSON.parse(resposta)

      if (!Array.isArray(transacoes)) throw new Error('Resposta da IA não é um array')
    } catch (erroLLM) {
      console.warn('Falha na IA ou timeout. Usando fallback local.')
      transacoes = extrairFallbackLocal(texto)
    }

    return transacoes
  } catch (e) {
    console.error('Erro ao processar extrato:', e)
    return [
      {
        origem: null,
        data: null,
        valor: null,
        legivel: false,
      },
    ]
  }
}

type PesosSimilaridade = {
  data: number
  valor: number
  fornecedor: number
}



export function reconciliar(
  faturas: MetadadoFatura[],
  extrato: TransacaoExtrato[],
  pesos: PesosSimilaridade = { data: 40, valor: 40, fornecedor: 20 },
): Correspondencia[] {
  const correspondencias: Correspondencia[] = []
  const transacoesDisponiveis = [...extrato]

  for (const fatura of faturas) {
    let melhorScore = 0
    let melhorTransacaoIndex = -1
    const observacoes: string[] = []

    for (let i = 0; i < transacoesDisponiveis.length; i++) {
      const transacao = transacoesDisponiveis[i]
      let score = 0

      // Comparação por data
      if (fatura.data && transacao.data) {
        if (fatura.data === transacao.data) {
          score = pesos.data
        }
      } else {
        observacoes.push('Data ausente na fatura ou transação')
      }

      // Comparação por valor
      if (typeof fatura.valorTotal === 'number' && typeof transacao.valor === 'number') {
        if (Math.abs(fatura.valorTotal - transacao.valor) < 1) {
          score = pesos.valor
        }
      } else {
        observacoes.push('Valor ausente ou inválido na fatura ou transação')
      }

      // Comparação por fornecedor
      if (fatura.fornecedor && transacao.origem) {
        if (transacao.origem.toLowerCase().includes(fatura.fornecedor.toLowerCase())) {
          score = pesos.fornecedor
        }
      } else {
        observacoes.push('Fornecedor ou origem ausente')
      }

      if (score > melhorScore) {
        melhorScore = score
        melhorTransacaoIndex = i
      }
    }

    const melhorTransacao =
      melhorTransacaoIndex >= 0 ? transacoesDisponiveis.splice(melhorTransacaoIndex, 1)[0] : null

    correspondencias.push({
      fatura,
      transacao: melhorTransacao,
      faturaId: fatura.id,
      transacaoId: melhorTransacao?.id as string,
      similaridade: melhorScore,
      observacoes: observacoes.length > 0 ? observacoes : undefined,
    })
  }

  return correspondencias
}
