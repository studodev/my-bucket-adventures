import Category from "#models/category";
import type { HasOne } from "@adonisjs/lucid/types/relations";
import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from "@adonisjs/lucid/orm";

export default class Bucket extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare title: string

    @column()
    declare categoryId: string

    @hasOne(() => Category)
    declare category: HasOne<typeof Category>

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}
