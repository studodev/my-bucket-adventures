import { exists } from "#validators/helpers/db";
import vine from '@vinejs/vine'

export const createBucketValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(3).maxLength(60),
        categoryId: vine.string().exists(exists('categories', 'id')),
    })
)
