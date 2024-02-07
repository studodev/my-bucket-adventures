import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'categories'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')

            table.string('name', 60)
            table.string('icon', 1)
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
