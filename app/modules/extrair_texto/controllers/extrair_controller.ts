import type { HttpContext } from '@adonisjs/core/http'
//import Maintences from '../models/maintences.js'

export default class ExtrairController{
  /**
   * Listar todos os manutenções
   */
  async extractText({ response }: HttpContext) {
  
    return response.json({ message: 'Extrair texto endpoint funcionando!' })
  }
}
