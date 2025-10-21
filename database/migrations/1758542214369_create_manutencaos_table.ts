import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'manutencaos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enu('tipo',['preventiva','corretiva'])
      table.string('description')
      table.integer('atm_id').unsigned()
      table.integer('user_id').unsigned()

      table.foreign('atm_id').references('id').inTable('atms')
      table.foreign('user_id').references('id').inTable('users')

      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}