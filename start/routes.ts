import BucketsController from "#controllers/buckets_controller";
import ItemsController from "#controllers/items_controller";
import MainController from "#controllers/main_controller";
import router from '@adonisjs/core/services/router'

// Main
router.get('/', [MainController, 'home']).as('main_home')

// Buckets
router.get('/buckets', [BucketsController, 'list']).as('bucket_list')
router.get('/buckets/new', [BucketsController, 'new']).as('bucket_new')
router.post('/buckets/new', [BucketsController, 'store']).as('bucket_store')
router.get('/buckets/:id', [BucketsController, 'view']).as('bucket_view')
router.post('/buckets/:id/delete', [BucketsController, 'delete']).as('bucket_delete')
router.post('/buckets/:id/item', [BucketsController, 'itemNew']).as('bucket_item_new')

// Item
router.get('/items/:id/done', [ItemsController, 'done']).as('item_done')
router.post('/items/:id/delete', [ItemsController, 'delete']).as('item_delete')
