import { unique } from "#validators/helpers/db";
import vine from "@vinejs/vine";

export const createUserValidator = vine.compile(
    vine.object({
        email: vine.string().trim().email().unique(unique('users', 'email')),
        username: vine.string().trim().minLength(3).maxLength(30),
        password: vine.string().trim().minLength(8).maxLength(30),
    })
)
