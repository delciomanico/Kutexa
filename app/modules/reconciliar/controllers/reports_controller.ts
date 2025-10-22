import type { HttpContext } from '@adonisjs/core/http'

export default class ReportsController {

    public async index({ response }: HttpContext) {
        const reports = [
            {
                "resumo": {
                    "totalFaturas": 5,
                    "totalTransacoes": 4,
                    "correspondencias": 3,
                    "naoReconciliadas": 2,
                    "transacoesSemCorrespondencia": 1
                },
                "tabela": [{
                    "fatura": {
                        "arquivo": "Fatura AlphaTech NIF 5001234567 01.10.25.pdf",
                        "nome": "ALPHATECH SOLUTIONS",
                        "data": "01/10/2025",
                        "valor": 2500
                    },
                    "transacao": {
                        "descricao": "Pagamento ALPHATECH",
                        "data": "02/10/2025",
                        "valor": 2500
                    },
                    "similaridade": 98
                },
                {
                    "fatura": {
                        "arquivo": "Fatura BetaCorp NIF 5007654321 03.10.25.pdf",
                        "nome": "BETACORP LDA",
                        "data": "03/10/2025",
                        "valor": 4800
                    },
                    "transacao": {
                        "descricao": "Transferência BETACORP",
                        "data": "04/10/2025",
                        "valor": 4800
                    },
                    "similaridade": 95
                },
                {
                    "fatura": {
                        "arquivo": "Fatura GammaTech NIF 5009988776 05.10.25.pdf",
                        "nome": "GAMMATECH",
                        "data": "05/10/2025",
                        "valor": 3200
                    },
                    "transacao": {
                        "descricao": "Pagamento GAMMATECH",
                        "data": "06/10/2025",
                        "valor": 3200
                    },
                    "similaridade": 92
                },
                {
                    "fatura": {
                        "arquivo": "Fatura DeltaServ NIF 5001122334 07.10.25.pdf",
                        "nome": "DELTASERV",
                        "data": "07/10/2025",
                        "valor": 1500
                    },
                    "transacao": {
                        "descricao": null,
                        "data": null,
                        "valor": null
                    },
                    "similaridade": 0
                },
                {
                    "fatura": {
                        "arquivo": "Fatura Epsilon LDA NIF 5004455667 08.10.25.pdf",
                        "nome": "EPSILON LDA",
                        "data": "08/10/2025",
                        "valor": 2100
                    },
                    "transacao": {
                        "descricao": null,
                        "data": null,
                        "valor": null
                    },
                    "similaridade": 0
                }],
                "faturasSemCorrespondencia": [
                    {
                        "arquivo": "Fatura DeltaServ NIF 5001122334 07.10.25.pdf",
                        "nome": "DELTASERV",
                        "data": "07/10/2025",
                        "valor": 1500,
                        "similaridade": 0
                    },
                    {
                        "arquivo": "Fatura Epsilon LDA NIF 5004455667 08.10.25.pdf",
                        "nome": "EPSILON LDA",
                        "data": "08/10/2025",
                        "valor": 2100,
                        "similaridade": 0
                    }
                ],
                "transacoesSemCorrespondencia": [{
                    "descricao": "Transferência não identificada",
                    "data": "09/10/2025",
                    "valor": 1800
                }]
            },
            {
                "resumo": {
                    "totalFaturas": 3,
                    "totalTransacoes": 3,
                    "correspondencias": 2,
                    "naoReconciliadas": 1,
                    "transacoesSemCorrespondencia": 1
                },
                "tabela": [
                    {
                        "fatura": {
                            "arquivo": "Fatura OrionTech NIF 5012345678 11.10.25.pdf",
                            "nome": "ORIONTECH",
                            "data": "11/10/2025",
                            "valor": 3000
                        },
                        "transacao": {
                            "descricao": "Pagamento ORIONTECH",
                            "data": "12/10/2025",
                            "valor": 3000
                        },
                        "similaridade": 96
                    },
                    {
                        "fatura": {
                            "arquivo": "Fatura NovaData NIF 5018765432 12.10.25.pdf",
                            "nome": "NOVADATA",
                            "data": "12/10/2025",
                            "valor": 2700
                        },
                        "transacao": {
                            "descricao": "Transferência NOVADATA",
                            "data": "13/10/2025",
                            "valor": 2700
                        },
                        "similaridade": 93
                    },
                    {
                        "fatura": {
                            "arquivo": "Fatura SkyNet NIF 5019988776 13.10.25.pdf",
                            "nome": "SKYNET",
                            "data": "13/10/2025",
                            "valor": 2200
                        },
                        "transacao": {
                            "descricao": null,
                            "data": null,
                            "valor": null
                        },
                        "similaridade": 0
                    }
                ],
                "faturasSemCorrespondencia": [
                    {
                        "arquivo": "Fatura SkyNet NIF 5019988776 13.10.25.pdf",
                        "nome": "SKYNET",
                        "data": "13/10/2025",
                        "valor": 2200,
                        "similaridade": 0
                    }
                ],
                "transacoesSemCorrespondencia": [
                    {
                        "descricao": "Transferência não identificada",
                        "data": "14/10/2025",
                        "valor": 1900
                    }
                ]
            }
        ]

        return response.json({ reports })
    }

    public async show({ params }: HttpContext) {
        return { message: `Details of report with id ${params.id}` }
    }

    public async create({ request }: HttpContext) {
        const data = request.only(['title', 'content'])
        return { message: 'Report created', data }
    }
}