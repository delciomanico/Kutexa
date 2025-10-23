import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import HistoricoReconciliacao from './historico_reconciliacao.js'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ReconciliacaoTabela extends BaseModel {
  public static table = 'reconciliacoes_tabela'

  @column({ isPrimary: true, columnName: 'id' })
  public id!: number

  // mapeamento para colunas snake_case na DB
  @column({ columnName: 'historico_id' })
  public historicoId!: number | null

  @column({ columnName: 'fatura_arquivo' })
  public faturaArquivo!: string

  @column({ columnName: 'fatura_nome' })
  public faturaNome!: string

  @column.dateTime({ columnName: 'fatura_data' })
  public faturaData!: DateTime | null

  @column({ columnName: 'fatura_valor' })
  public faturaValor!: number | null

  @column({ columnName: 'transacao_descricao' })
  public transacaoDescricao!: string | null

  @column.dateTime({ columnName: 'transacao_data' })
  public transacaoData!: DateTime | null

  @column({ columnName: 'transacao_valor' })
  public transacaoValor!: number | null

  @column({ columnName: 'similaridade' })
  public similaridade!: number

  @belongsTo(() => HistoricoReconciliacao, { foreignKey: 'historico_id' })
  public historico!: BelongsTo<typeof HistoricoReconciliacao>

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public updatedAt!: DateTime
}
