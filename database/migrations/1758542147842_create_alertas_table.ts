import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'alertas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enu('tipo', ['falha', 'numerario'])
      table.enu('estado', ['aberto', 'fechado'])
      table.integer('atm_id').unsigned().notNullable()
      table.foreign('atm_id').references('id').inTable('atms')
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}