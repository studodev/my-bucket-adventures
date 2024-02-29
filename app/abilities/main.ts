import Bucket from "#models/bucket";
import User from "#models/user";
import { Bouncer } from '@adonisjs/bouncer'

export const bucketAccess = Bouncer.ability((user: User, bucket: Bucket) => {
    return user.id === bucket.ownerId;
})
