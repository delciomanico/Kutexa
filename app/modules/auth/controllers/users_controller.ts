import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'

export default class UsersController {
  /**
   * Listar todos os usuários
   */
  async index({ response }: HttpContext) {
    const users = await User.query().preload('funcao')
    return response.ok(users)
  }

  /**
   * Exibir formulário de criação (não usado em APIs REST)
   */
  async create({ response }: HttpContext) {
    return response.status(204) // Sem conteúdo
  }

  /**
   * Criar novo usuário
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'email', 'password'])
    const user = await User.create(data)
    return response.created(user)
  }

  /**
   * Mostrar um usuário específico
   */
  async show({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'Usuário não encontrado' })
    }
    return response.ok(user)
  }

  /**
   * Exibir formulário de edição (não usado em APIs REST)
   */
  async edit({ params, response }: HttpContext) {
    return response.status(204) // Sem conteúdo
  }

  /**
   * Atualizar um usuário
   */
  async update({ params, request, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'Usuário não encontrado' })
    }

    const data = request.only(['name', 'email', 'password'])
    user.merge(data)
    await user.save()

    return response.ok(user)
  }

  /**
   * Deletar um usuário
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'Usuário não encontrado' })
    }

    await user.delete()
    return response.noContent()
  }
}
