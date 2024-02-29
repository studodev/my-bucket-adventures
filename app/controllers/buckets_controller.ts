import { bucketAccess } from "#abilities/main";
import Bucket from "#models/bucket";
import Category from "#models/category";
import Item from "#models/item";
import { createBucketValidator } from "#validators/bucket";
import { createItemValidator } from "#validators/item";
import type { HttpContext } from '@adonisjs/core/http'

export default class BucketsController {
    async list(ctx: HttpContext) {
        const user = ctx.auth.getUserOrFail();
        await user.load('buckets', q => q.preload('category'));

        return ctx.view.render('pages/buckets/list', {
            buckets: user.buckets,
        });
    }

    async new(ctx: HttpContext) {
        const categories = await Category.all();

        return ctx.view.render('pages/buckets/new', {
            categories: categories,
        });
    }

    async store(ctx: HttpContext) {
        const bucket = await ctx.request.validateUsing(createBucketValidator);
        await Bucket.create({
            ...bucket,
            ownerId: ctx.auth.getUserOrFail().id,
        });

        return ctx.response.redirect().toRoute('bucket_list');
    }

    async view(ctx: HttpContext) {
        const id = ctx.params.id;
        const bucket = await Bucket.findOrFail(id);

        if (await ctx.bouncer.denies(bucketAccess, bucket)) {
            return ctx.response.abort('Your cannot access this bucket', 403)
        }

        await bucket.load('category');
        await bucket.load('items');

        return ctx.view.render('pages/buckets/view', {
            bucket: bucket,
        });
    }

    async delete(ctx: HttpContext) {
        const id = ctx.params.id;
        const bucket = await Bucket.findOrFail(id);

        if (await ctx.bouncer.denies(bucketAccess, bucket)) {
            return ctx.response.abort('Your cannot access this bucket', 403)
        }

        await bucket.delete();

        return ctx.response.redirect().toRoute('bucket_list');
    }

    async itemNew(ctx: HttpContext) {
        const id = ctx.params.id;
        const bucket = await Bucket.findOrFail(id);

        if (await ctx.bouncer.denies(bucketAccess, bucket)) {
            return ctx.response.abort('Your cannot access this bucket', 403)
        }

        const item = await ctx.request.validateUsing(createItemValidator);

        await Item.create({
            ...item,
            bucketId: bucket.id.toString(),
        });
        return ctx.response.redirect().toRoute('bucket_view', {
            id: bucket.id,
        });
    }
}
