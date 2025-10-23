import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import ReconciliacaoTabela from './reconciliacao_tabela.js'
import FaturaSemCorrespondencia from './fatura_sem_correspondencia.js'
import TransacaoSemCorrespondencia from './transacao_sem_correspondencia.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class HistoricoReconciliacao extends BaseModel {
  public static table = 'historicos_reconciliacoes'

  @column({ isPrimary: true })
  public declare  id: number

  @column()
  public declare totalFaturas: number

  @column()
  public declare totalTransacoes: number

  @column()
  public declare correspondencias: number

  @column()
  public declare naoReconciliadas: number

  @column()
  public declare transacoesSemCorrespondencia: number

  @hasMany(() => ReconciliacaoTabela)
  public declare tabela: HasMany<typeof ReconciliacaoTabela>

  @hasMany(() => FaturaSemCorrespondencia)
  public declare faturasSemCorrespondencia: HasMany<typeof FaturaSemCorrespondencia>

  @hasMany(() => TransacaoSemCorrespondencia)
  public declare transacoesSemCorrespondenciaList: HasMany<typeof TransacaoSemCorrespondencia>
}
