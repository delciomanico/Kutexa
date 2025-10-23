 import type { HttpContext } from '@adonisjs/core/http'

import TransacaoSemCorrespondencia from '#models/transacao_sem_correspondencia'

export default class TransacaoSemCorrespondenciaController {
  public async index({}: HttpContext) {
    return await TransacaoSemCorrespondencia.query()
      .orderBy('created_at', 'desc')
  }

  public async show({ params }: HttpContext) {
    return await TransacaoSemCorrespondencia.query()
      .where('id', params.id)
      .firstOrFail()
  }

  public async destroy({ params, response }: HttpContext) {
    const transacao = await TransacaoSemCorrespondencia.findOrFail(params.id)
    await transacao.delete()
    return response.noContent()
  }
}
