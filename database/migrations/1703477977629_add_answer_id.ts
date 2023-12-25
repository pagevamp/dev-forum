import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'threads'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('answer_id').unsigned().references('comments.id').onDelete('CASCADE').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('answer_id')
    })
  }
}
