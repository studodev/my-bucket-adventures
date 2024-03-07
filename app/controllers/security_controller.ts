import User from "#models/user";
import { createUserValidator } from "#validators/user";
import type { HttpContext } from '@adonisjs/core/http'

export default class SecurityController {
    form(ctx: HttpContext) {
        return ctx.view.render('pages/security/form');
    }

    async handle(ctx: HttpContext) {
        const { email, password } = ctx.request.only(['email', 'password']);

        const user = await User.verifyCredentials(email, password);
        await ctx.auth.use('web').login(user);

        return ctx.response.redirect().toRoute('bucket_list');
    }

    registerForm(ctx: HttpContext) {
        return ctx.view.render('pages/security/register-form');
    }

    async registerHandle(ctx: HttpContext) {
        const user = await ctx.request.validateUsing(createUserValidator);
        await User.create(user);

        return ctx.response.redirect().toRoute('security_form');
    }

    async logout(ctx: HttpContext) {
        await ctx.auth.use('web').logout()
        return ctx.response.redirect().toRoute('main_home')
    }
}
