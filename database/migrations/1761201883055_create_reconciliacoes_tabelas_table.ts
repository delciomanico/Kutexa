import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ReconciliacoesTabela extends BaseSchema {
  protected tableName = 'reconciliacoes_tabela'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('historico_id').unsigned().references('id').inTable('historicos_reconciliacoes').onDelete('CASCADE')
      table.string('fatura_arquivo')
      table.string('fatura_nome')
      table.string('fatura_data')
      table.decimal('fatura_valor', 12, 2)
      table.string('transacao_descricao').nullable()
      table.string('transacao_data').nullable()
      table.decimal('transacao_valor', 12, 2).nullable()
      table.integer('similaridade')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
