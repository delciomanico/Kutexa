import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ModuloFuncoe extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare modulo_id: number

  @column()
  declare funcao_id: number

  @column()
  declare criar: boolean

  @column()
  declare ler: boolean

  @column()
  declare atualizar: boolean

  @column()
  declare definir: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

}