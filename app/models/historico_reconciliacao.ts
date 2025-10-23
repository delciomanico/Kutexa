import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import ReconciliacaoTabela from './reconciliacao_tabela.js'
import FaturaSemCorrespondencia from './fatura_sem_correspondencia.js'
import TransacaoSemCorrespondencia from './transacao_sem_correspondencia.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class HistoricoReconciliacao extends BaseModel {
  public static table = 'historicos_reconciliacoes'

  @column({ isPrimary: true })
  public declare id: number

  @column({ columnName: 'total_faturas' })
  public declare totalFaturas: number

  @column({ columnName: 'total_transacoes' })
  public declare totalTransacoes: number

  @column({ columnName: 'correspondencias' })
  public declare correspondencias: number

  @column({ columnName: 'nao_reconciliadas' })
  public declare naoReconciliadas: number

  @column({ columnName: 'transacoes_sem_correspondencia' })
  public declare transacoesSemCorrespondencia: number

  @hasMany(() => ReconciliacaoTabela, { foreignKey: 'historico_id' })
  public declare tabela: HasMany<typeof ReconciliacaoTabela>

  @hasMany(() => FaturaSemCorrespondencia, { foreignKey: 'historico_id' })
  public declare faturasSemCorrespondencia: HasMany<typeof FaturaSemCorrespondencia>

  @hasMany(() => TransacaoSemCorrespondencia, { foreignKey: 'historico_id' })
  public declare transacoesSemCorrespondenciaList: HasMany<typeof TransacaoSemCorrespondencia>

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public declare updatedAt: DateTime
}
