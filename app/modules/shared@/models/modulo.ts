import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Funcoe from './funcao.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Modulo extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @manyToMany(()=> Funcoe, {
    pivotTable: 'modulo_funcao',
    pivotColumns: ['criar', 'ler', 'atualizar', 'definir'],
    pivotTimestamps: true
  })
  declare funcoes: ManyToMany<typeof Funcoe>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}