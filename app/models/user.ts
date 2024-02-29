import Bucket from "#models/bucket";
import type { HasMany } from "@adonisjs/lucid/types/relations";
import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from "@adonisjs/lucid/orm";

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
    uids: ['email'],
    passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare username: string

    @column()
    declare email: string

    @column()
    declare password: string

    @hasMany(() => Bucket, {
        foreignKey: 'ownerId',
    })
    declare buckets: HasMany<typeof Bucket>

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime | null
}
