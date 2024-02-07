import Bucket from "#models/bucket";
import Category from "#models/category";
import { createBucketValidator } from "#validators/bucket";
import type { HttpContext } from '@adonisjs/core/http'

export default class BucketsController {
    list(ctx: HttpContext) {
        return ctx.view.render('pages/buckets/list');
    }

    async new(ctx: HttpContext) {
        const categories = await Category.all();

        return ctx.view.render('pages/buckets/new', {
            categories: categories,
        });
    }

    async store(ctx: HttpContext) {
        const bucket = await ctx.request.validateUsing(createBucketValidator);
        await Bucket.create(bucket);
        return ctx.response.redirect().toRoute('bucket_list');
    }
}
