import { BaseSchema } from '@adonisjs/lucid/schema'

export default class HistoricosReconciliacoes extends BaseSchema {
  protected tableName = 'historicos_reconciliacoes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('total_faturas')
      table.integer('total_transacoes')
      table.integer('correspondencias')
      table.integer('nao_reconciliadas')
      table.integer('transacoes_sem_correspondencia')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
