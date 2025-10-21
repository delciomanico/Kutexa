import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'agencias'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('location')
      table.string('contact')
      table.timestamps(true)

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}