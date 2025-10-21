import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'atms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('codigo_atm')
      table.string('location')
      table.enu('estado', ['ativo', 'inativo', 'falha'])
      table.string('capacidade_notas')
      table.integer('agencia_id').unsigned().nullable()

      table.foreign('agencia_id').references('id').inTable('agencias')
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}