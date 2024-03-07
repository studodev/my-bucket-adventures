import BucketsController from "#controllers/buckets_controller";
import ItemsController from "#controllers/items_controller";
import MainController from "#controllers/main_controller";
import SecurityController from "#controllers/security_controller";
import { middleware } from "#start/kernel";
import router from '@adonisjs/core/services/router'

// Main
router.get('/', [MainController, 'home']).as('main_home')

// Security
router.get('/login', [SecurityController, 'form']).as('security_form').use(middleware.guest())
router.post('/login', [SecurityController, 'handle']).as('security_handle').use(middleware.guest())
router.get('/register', [SecurityController, 'registerForm']).as('security_register_form').use(middleware.guest())
router.post('/register', [SecurityController, 'registerHandle']).as('security_register_handle').use(middleware.guest())
router.get('/logout', [SecurityController, 'logout']).as('security_logout').use(middleware.auth())

// Buckets
router.get('/buckets', [BucketsController, 'list']).as('bucket_list').use(middleware.auth())
router.get('/buckets/new', [BucketsController, 'new']).as('bucket_new').use(middleware.auth())
router.post('/buckets/new', [BucketsController, 'store']).as('bucket_store').use(middleware.auth())
router.get('/buckets/:id', [BucketsController, 'view']).as('bucket_view').use(middleware.auth())
router.post('/buckets/:id/delete', [BucketsController, 'delete']).as('bucket_delete').use(middleware.auth())
router.post('/buckets/:id/item', [BucketsController, 'itemNew']).as('bucket_item_new').use(middleware.auth())

// Item
router.get('/items/:id/done', [ItemsController, 'done']).as('item_done').use(middleware.auth())
router.post('/items/:id/delete', [ItemsController, 'delete']).as('item_delete').use(middleware.auth())
