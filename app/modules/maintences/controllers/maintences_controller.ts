import type { HttpContext } from '@adonisjs/core/http'
import Maintences from '../models/maintences.js'

export default class MaintencesController {
  /**
   * Listar todos os manutenções
   */
  async index({ response }: HttpContext) {
    const maintences = await Maintences.query().preload('atm').preload('user')
    return response.ok(maintences)
  }

  /**
   * Exibir formulário de criação (não usado em APIs REST)
   */
  async create({ response }: HttpContext) {
    return response.status(204)
  }

  /**
   * Criar nova manutenção
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['tipo', 'description', 'atmId', 'userId'])
    const maintences = await Maintences.create(data)
    return response.created(maintences)
  }

  /**
   * Mostrar um carregamento específico
   */
  async show({ params, response }: HttpContext) {
    const maintences = await Maintences.findOrFail(params.id)
    return response.ok(maintences)
  }

  /**
   * Exibir formulário de edição (não usado em APIs REST)
   */
  async edit({ response }: HttpContext) {
    return response.status(204)
  }

  /**
   * Atualizar um carregamento
   */
  async update({ params, request, response }: HttpContext) {
    const maintences = await Maintences.findOrFail(params.id)

    const data = request.only(['tipo', 'description', 'atmId', 'userId'])
    maintences.merge(data)
    await maintences.save()

    return response.ok(maintences)
  }

  /**
   * Deletar um carregamento
   */
  async destroy({ params, response }: HttpContext) {
    const maintences = await Maintences.findOrFail(params.id)
    await maintences.delete()
    return response.noContent()
  }
}
