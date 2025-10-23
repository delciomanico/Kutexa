import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import HistoricoReconciliacao from './historico_reconciliacao.js'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class TransacaoSemCorrespondencia extends BaseModel {
  public static table = 'transacoes_sem_correspondencia'

  @column({ isPrimary: true })
  public declare id: number

  @column()
  public declare historicoId: number

  @column()
  public declare origem: string | null

  @column()
  public declare descricao: string | null

  @column.date()
  public declare data: DateTime | null

  @column()
  public declare valor: number | null

  @belongsTo(() => HistoricoReconciliacao)
  public declare historico: BelongsTo<typeof HistoricoReconciliacao>
}
