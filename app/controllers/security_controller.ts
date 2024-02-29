import User from "#models/user";
import type { HttpContext } from '@adonisjs/core/http'
import hash from "@adonisjs/core/services/hash";

export default class SecurityController {
    async form(ctx: HttpContext) {
        console.log(await hash.make('test'));

        return ctx.view.render('pages/security/form');
    }

    async handle(ctx: HttpContext) {
        const { email, password } = ctx.request.only(['email', 'password']);

        const user = await User.verifyCredentials(email, password);
        await ctx.auth.use('web').login(user);

        return ctx.response.redirect().toRoute('bucket_list');
    }

    async logout(ctx: HttpContext) {
        await ctx.auth.use('web').logout()
        return ctx.response.redirect().toRoute('main_home')
    }
}
