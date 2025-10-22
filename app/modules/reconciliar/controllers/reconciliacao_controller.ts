import type { HttpContext } from '@Adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import {
  extrairTextoOCR,
  extrairMetadados,
  lerExtrato,
  reconciliar,
  TransacaoExtrato,
  MetadadoFatura,
} from '../../../Services/Reconciliacao.js'
import fs from 'fs'
import path from 'path'

export default class ReconciliacaoController {
  public async reconciliar({ request, response }: HttpContext) {
    try {
      const faturaFilesInput = request.files('faturas')
      const extratoFilesInput = request.files('extratos') // agora aceita múltiplos extratos
      // Normaliza inputs (request.files pode retornar objeto ou array)
      const faturaFiles = Array.isArray(faturaFilesInput)
        ? faturaFilesInput
        : faturaFilesInput
        ? [faturaFilesInput]
        : []
      const extratoFiles = Array.isArray(extratoFilesInput)
        ? extratoFilesInput
        : extratoFilesInput
        ? [extratoFilesInput]
        : []

      if (extratoFiles.length === 0 || faturaFiles.length === 0) {
        return response.badRequest({ error: 'Envie pelo menos uma fatura e um extrato bancário.' })
      }

      // Salvar arquivos temporariamente
      const pastaFaturas = path.join(app.tmpPath(), 'faturas')
      const pastaExtratos = path.join(app.tmpPath(), 'extratos')

      // Limpa pastas temporárias antes de salvar os novos uploads
      if (fs.existsSync(pastaFaturas)) fs.rmSync(pastaFaturas, { recursive: true, force: true })
      if (fs.existsSync(pastaExtratos)) fs.rmSync(pastaExtratos, { recursive: true, force: true })
      fs.mkdirSync(pastaFaturas, { recursive: true })
      fs.mkdirSync(pastaExtratos, { recursive: true })

      for (const file of faturaFiles) {
        await file.move(pastaFaturas, { overwrite: true })
      }

      for (const file of extratoFiles) {
        await file.move(pastaExtratos, { overwrite: true })
      }

      // Processar faturas
      const arquivosFatura = fs.readdirSync(pastaFaturas)
      const faturas: MetadadoFatura[] = []

      for (const arquivo of arquivosFatura) {
        const caminho = path.join(pastaFaturas, arquivo)
        const texto = await extrairTextoOCR(caminho)
        const metadado = await extrairMetadados(texto, arquivo)
        faturas.push(metadado)
      }

      // Processar extratos
      const arquivosExtrato = fs.readdirSync(pastaExtratos)
      const transacoes: TransacaoExtrato[] = []

      for (const arquivo of arquivosExtrato) {
        const caminho = path.join(pastaExtratos, arquivo)
        try {
          const extrato = await lerExtrato(caminho)
          if (Array.isArray(extrato) && extrato.length > 0) {
            transacoes.push(...extrato)
          } else {
            console.warn('Nenhuma transacao extraída do extrato:', arquivo)
          }
        } catch (e) {
          console.error('Erro ao ler extrato', arquivo, e)
        }
      }

      // Reconciliar
      const resultado = reconciliar(faturas, transacoes)

      // definir limiar para definir "correspondência válida"
      const LIMIAR_SIMILARIDADE = 50

      // identificar faturas sem correspondência (sem transacao ou similaridade abaixo do limiar)
      const faturasSemCorrespondencia = resultado
        .filter((r) => !r.transacao || (r.similaridade ?? 0) < LIMIAR_SIMILARIDADE)
        .map((r) => ({
          arquivo: r.fatura.origemArquivo,
          nome: r.fatura.fornecedor,
          data: r.fatura.data,
          valor: r.fatura.valorTotal,
          similaridade: r.similaridade ?? 0,
        }))

      // identificar transações correspondidas (usar id quando disponível, senão fingerprint)
      const fingerprint = (t: TransacaoExtrato) =>
        t.id ?? `${t.origem ?? ''}||${t.data ?? ''}||${t.valor ?? ''}`

      const transacoesMatchSet = new Set(
        resultado
          .filter((r) => r.transacao)
          .map((r) => fingerprint(r.transacao as TransacaoExtrato))
      )

      // transacoes sem correspondencia = todas transacoes que não estão no conjunto de matches
      const transacoesSemCorrespondencia = transacoes
        .filter((t) => !transacoesMatchSet.has(fingerprint(t)))
        .map((t) => ({
          origem: t.origem ?? t.descricao ?? null,
          data: t.data ?? null,
          valor: t.valor ?? null,
          descricao: t.descricao ?? null,
        }))

      // Retornar resposta estruturada
      return response.ok({
        resumo: {
          totalFaturas: faturas.length,
          totalTransacoes: transacoes.length,
          correspondencias: resultado.filter((r) => r.transacao && (r.similaridade ?? 0) >= LIMIAR_SIMILARIDADE).length,
          naoReconciliadas: faturasSemCorrespondencia.length,
          transacoesSemCorrespondencia: transacoesSemCorrespondencia.length,
        },
        tabela: resultado.map((r) => ({
          fatura: {
            arquivo: r.fatura.origemArquivo,
            nome: r.fatura.fornecedor,
            data: r.fatura.data,
            valor: r.fatura.valorTotal,
          },
          transacao: {
            descricao: r.transacao?.origem || null,
            data: r.transacao?.data || null,
            valor: r.transacao?.valor || null,
          },
          similaridade: r.similaridade,
        })),
        faturasSemCorrespondencia,
        transacoesSemCorrespondencia,
      })
    } catch (error) {
      console.error('Erro na reconciliação:', error)
      return response.internalServerError({ error: 'Erro ao processar reconciliação.' })
    }
  }
}
