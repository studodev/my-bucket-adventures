import Item from "#models/item";
import type { HttpContext } from '@adonisjs/core/http'

export default class ItemsController {
    async done(ctx: HttpContext) {
        const id = ctx.params.id;
        const item = await Item.findOrFail(id);

        item.done = !item.done;
        await item.save();

        return ctx.response.redirect().toRoute('bucket_view', {
            id: item.bucketId,
        });
    }

    async delete(ctx: HttpContext) {
        const id = ctx.params.id;
        const item = await Item.findOrFail(id);
        await item.delete();

        return ctx.response.redirect().toRoute('bucket_view', {
            id: item.bucketId,
        });
    }
}
