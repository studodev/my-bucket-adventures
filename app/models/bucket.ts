import Category from "#models/category";
import Item from "#models/item";
import User from "#models/user";
import type { BelongsTo, HasMany } from "@adonisjs/lucid/types/relations";
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from "@adonisjs/lucid/orm";

export default class Bucket extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare title: string

    @column()
    declare ownerId: number

    @belongsTo(() => User)
    declare owner: BelongsTo<typeof User>

    @column()
    declare categoryId: string

    @belongsTo(() => Category)
    declare category: BelongsTo<typeof Category>

    @hasMany(() => Item)
    declare items: HasMany<typeof Item>

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}
