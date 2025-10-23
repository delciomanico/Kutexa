import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import HistoricoReconciliacao from './historico_reconciliacao.js'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ReconciliacaoTabela extends BaseModel {
  public static table = 'reconciliacoes_tabela'

  @column({ isPrimary: true })
  public declare id: number

  @column()
  public declare historicoId: number

  @column()
  public declare faturaArquivo: string

  @column()
  public declare faturaNome: string

  @column.date()
  public declare faturaData: DateTime

  @column()
  public declare faturaValor: number

  @column()
  public declare transacaoDescricao: string | null

  @column.date()
  public declare transacaoData: DateTime | null

  @column()
  public declare transacaoValor: number | null

  @column()
  public declare similaridade: number

  @belongsTo(() => HistoricoReconciliacao)
  public declare historico: BelongsTo<typeof HistoricoReconciliacao>
}
