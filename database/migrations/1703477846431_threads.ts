import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ThreadStatus } from 'App/Models/Thread'

export default class extends BaseSchema {
  protected tableName = 'threads'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('RESTRICT')
      table.json('tags').notNullable()
      table.string('title')
      table.string('details', 3000)
      table.string('code_example', 3000).nullable()
      table.string('how_to_replicate', 3000).nullable()
      table.string('description', 3000).nullable()
      table.enum('status', Object.values(ThreadStatus)).defaultTo(ThreadStatus.OPEN)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
