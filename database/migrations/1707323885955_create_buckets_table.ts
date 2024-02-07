import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'buckets'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')

            table.string('title', 60)
            table.integer('category_id').unsigned().references('category.id')

            table.timestamp('created_at')
            table.timestamp('updated_at')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
