import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('first_name').nullable()
      table.string('last_name').nullable()
      table.string('username').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()

      table.integer('agencia_id').unsigned().nullable()
      table.integer('funcao_id').unsigned().nullable()
      table.timestamps(true)

      table.foreign('funcao_id').references('id').inTable('funcoes')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}