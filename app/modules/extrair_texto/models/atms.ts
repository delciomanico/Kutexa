import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Agencia from '../../agencies/models/agencies.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Atm extends BaseModel {
  @column({ isPrimary: true })
  public declare id: number

  @column()
  public declare codigoAtm: string

  @column()
  public declare location: string

  @column()
  public declare estado: 'ativo' | 'inativo' | 'falha'

  @column()
  public declare capacidadeNotas: string

  @column()
  public declare agenciaId: number | null

  @belongsTo(() => Agencia)
  public declare agencia: BelongsTo<typeof Agencia>

  @column.dateTime({ autoCreate: true })
  public declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public declare updatedAt: DateTime
}