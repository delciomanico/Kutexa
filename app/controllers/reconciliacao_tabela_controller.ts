 import type { HttpContext } from '@adonisjs/core/http'

import ReconciliacaoTabela from '#models/reconciliacao_tabela'

export default class ReconciliacaoTabelaController {
  public async index({}: HttpContext) {
    return await ReconciliacaoTabela.query()
      .orderBy('created_at', 'desc')
  }

  public async show({ params }: HttpContext) {
    return await ReconciliacaoTabela.query()
      .where('id', params.id)
      .firstOrFail()
  }

  public async destroy({ params, response }: HttpContext) {
    const tabela = await ReconciliacaoTabela.findOrFail(params.id)
    await tabela.delete()
    return response.noContent()
  }
}
