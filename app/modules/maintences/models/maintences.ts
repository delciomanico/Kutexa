import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Atm from './atms.js'
import User from '../../shared@/models/user.js'

export default class Maintences extends BaseModel {
  @column({ isPrimary: true })
  public declare id: number

  @column()
  public declare tipo: 'preventiva' | 'corretiva'

  @column()
  public declare description: string

  @column()
  public declare atmId: number

  @column()
  public declare userId: number

  @belongsTo(() => Atm)
  public declare atm: BelongsTo<typeof Atm>

  @belongsTo(() => User)
  public declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public declare updatedAt: DateTime
}
