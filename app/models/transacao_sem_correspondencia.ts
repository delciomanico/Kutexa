import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import HistoricoReconciliacao from './historico_reconciliacao.js'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class TransacaoSemCorrespondencia extends BaseModel {
  public static table = 'transacoes_sem_correspondencia'

  @column({ isPrimary: true, columnName: 'id' })
  public id!: number

  @column({ columnName: 'historico_id' })
  public historicoId!: number | null

  @column({ columnName: 'origem' })
  public origem!: string | null

  @column({ columnName: 'descricao' })
  public descricao!: string | null

  @column({ columnName: 'data' })
  public data!: string | null

  @column({ columnName: 'valor' })
  public valor!: number | null

  @belongsTo(() => HistoricoReconciliacao, { foreignKey: 'historico_id' })
  public historico!: BelongsTo<typeof HistoricoReconciliacao>

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public updatedAt!: DateTime
}
