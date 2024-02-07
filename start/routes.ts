import MainController from "#controllers/main_controller";
import router from '@adonisjs/core/services/router'

router.get('/', [MainController, 'home'])
