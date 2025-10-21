import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'modulo_funcaos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('modulo_id').unsigned().notNullable()
      table.integer('funcao_id').unsigned().notNullable()
      table.boolean('criar').defaultTo(false)
      table.boolean('ler').defaultTo(false)
      table.boolean('atualizar').defaultTo(false)
      table.boolean('definir').defaultTo(false)
      table.timestamps(true)

      table.foreign('modulo_id').references('id').inTable('modulos')
      table.foreign('funcao_id').references('id').inTable('funcoes')

      table.unique(['modulo_id', 'funcao_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}