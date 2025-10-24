// app/Controllers/Http/OdooController.ts
import { HttpContext } from '@adonisjs/core/http'
import { buscarFaturas, buscarVendas } from '../Services/OdooClient.js'

export default class OdooController {
  public async faturas({ response }: HttpContext) {
    try {
      const faturas = await buscarFaturas()
      return response.ok(faturas)
    } catch (error) {
      return response.internalServerError({ message: 'Erro ao buscar faturas', error })
    }
  }

  public async vendas({ response }: HttpContext) {
    try {
      const vendas = await buscarVendas()
      return response.ok(vendas)
    } catch (error) {
      return response.internalServerError({ message: 'Erro ao buscar vendas', error })
    }
  }
}
