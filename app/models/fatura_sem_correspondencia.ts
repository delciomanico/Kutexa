import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import HistoricoReconciliacao from './historico_reconciliacao.js'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class FaturaSemCorrespondencia extends BaseModel {
  public static table = 'faturas_sem_correspondencia'

  @column({ isPrimary: true })
  public declare id: number

  @column()
  public declare historicoId: number

  @column()
  public declare arquivo: string

  @column()
  public declare nome: string

  @column.date()
  public declare data: DateTime

  @column()
  public declare valor: number

  @column()
  public declare similaridade: number

  @belongsTo(() => HistoricoReconciliacao)
  public declare historico: BelongsTo<typeof HistoricoReconciliacao>
}
