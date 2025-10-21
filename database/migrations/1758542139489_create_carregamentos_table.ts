import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'carregamentos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enu('tipo',['recolha', 'abastecimento'])
     table.string('valor')
     table.integer('atm_id').unsigned().notNullable
     table.integer('user_id').unsigned().notNullable

     table.foreign('atm_id').references('id').inTable('atms')
     table.foreign('user_id').references('id').inTable('users')

      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}