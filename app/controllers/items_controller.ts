import { bucketAccess } from "#abilities/main";
import Item from "#models/item";
import type { HttpContext } from '@adonisjs/core/http'

export default class ItemsController {
    async done(ctx: HttpContext) {
        const id = ctx.params.id;
        const item = await Item.findOrFail(id);
        await item.load('bucket');

        if (await ctx.bouncer.denies(bucketAccess, item.bucket)) {
            return ctx.response.abort('Your cannot access this bucket', 403)
        }

        item.done = !item.done;
        await item.save();

        return ctx.response.redirect().toRoute('bucket_view', {
            id: item.bucketId,
        });
    }

    async delete(ctx: HttpContext) {
        const id = ctx.params.id;
        const item = await Item.findOrFail(id);

        if (await ctx.bouncer.denies(bucketAccess, item.bucket)) {
            return ctx.response.abort('Your cannot access this bucket', 403)
        }

        await item.delete();

        return ctx.response.redirect().toRoute('bucket_view', {
            id: item.bucketId,
        });
    }
}
