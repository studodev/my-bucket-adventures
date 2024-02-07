import type { HttpContext } from '@adonisjs/core/http'

export default class MainController {
    home(ctx: HttpContext) {
        return ctx.view.render('pages/main/home');
    }
}
