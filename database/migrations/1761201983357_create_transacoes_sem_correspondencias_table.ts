import { BaseSchema } from '@adonisjs/lucid/schema'

export default class TransacoesSemCorrespondencia extends BaseSchema {
  protected tableName = 'transacoes_sem_correspondencia'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('historico_id').unsigned().references('id').inTable('historicos_reconciliacoes').onDelete('CASCADE')
      table.string('origem').nullable()
      table.string('descricao').nullable()
      table.date('data').nullable()
      table.decimal('valor', 12, 2).nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
