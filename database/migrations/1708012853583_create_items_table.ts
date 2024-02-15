import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'items'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('name', 40)
            table.boolean('done').defaultTo(false)
            table.integer('bucket_id').unsigned().references('buckets.id')
            table.timestamp('created_at')
            table.timestamp('updated_at')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
