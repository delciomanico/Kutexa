import { BaseSchema } from '@adonisjs/lucid/schema'

export default class FaturasSemCorrespondencia extends BaseSchema {
  protected tableName = 'faturas_sem_correspondencia'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('historico_id').unsigned().references('id').inTable('historicos_reconciliacoes').onDelete('CASCADE')
      table.string('arquivo')
      table.string('nome')
      table.string('data')
      table.decimal('valor', 12, 2)
      table.integer('similaridade')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
