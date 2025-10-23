 import type { HttpContext } from '@adonisjs/core/http'

import HistoricoReconciliacao from '#models/historico_reconciliacao'

export default class HistoricosReconciliacoesController {
  public async index({}: HttpContext) {
    return await HistoricoReconciliacao.query()
      .orderBy('created_at', 'desc')
  }

  public async show({ params }: HttpContext) {
    return await HistoricoReconciliacao.query()
      .where('id', params.id)
      .firstOrFail()
  }

  public async destroy({ params, response }: HttpContext) {
    const historico = await HistoricoReconciliacao.findOrFail(params.id)
    await historico.delete()
    return response.noContent()
  }
}
