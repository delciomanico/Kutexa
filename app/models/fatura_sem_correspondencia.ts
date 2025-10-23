import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import HistoricoReconciliacao from './historico_reconciliacao.js'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class FaturaSemCorrespondencia extends BaseModel {
  public static table = 'faturas_sem_correspondencia'

  @column({ isPrimary: true, columnName: 'id' })
  public id!: number

  @column({ columnName: 'historico_id' })
  public historicoId!: number | null

  @column({ columnName: 'arquivo' })
  public arquivo!: string

  @column({ columnName: 'nome' })
  public nome!: string

  @column.dateTime({ columnName: 'data' })
  public data!: DateTime | null

  @column({ columnName: 'valor' })
  public valor!: number | null

  @column({ columnName: 'similaridade' })
  public similaridade!: number

  @belongsTo(() => HistoricoReconciliacao, { foreignKey: 'historico_id' })
  public historico!: BelongsTo<typeof HistoricoReconciliacao>

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public updatedAt!: DateTime
}
