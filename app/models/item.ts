import Bucket from "#models/bucket";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from "@adonisjs/lucid/orm";

export default class Item extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare name: string

    @column()
    declare done: boolean

    @column()
    declare bucketId: string

    @belongsTo(() => Bucket)
    declare bucket: BelongsTo<typeof Bucket>

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}
