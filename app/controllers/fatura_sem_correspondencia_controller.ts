 import type { HttpContext } from '@adonisjs/core/http'

import FaturaSemCorrespondencia from '#models/fatura_sem_correspondencia'

export default class  FaturaSemCorrespondenciaController {
  public async index({}: HttpContext) {
    return await FaturaSemCorrespondencia.query()
      .orderBy('created_at', 'desc')
  }

  public async show({ params }: HttpContext) {
    return await FaturaSemCorrespondencia.query()
      .where('id', params.id)
      .firstOrFail()
  }

  public async destroy({ params, response }: HttpContext) {
    const fatura = await FaturaSemCorrespondencia.findOrFail(params.id)
    await fatura.delete()
    return response.noContent()
  }
}
