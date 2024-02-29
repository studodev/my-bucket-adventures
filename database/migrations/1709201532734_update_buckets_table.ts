import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'buckets'

    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer('owner_id').unsigned().references('users.id').onDelete('CASCADE')
        })
    }

    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('owner_id')
        })
    }
}
