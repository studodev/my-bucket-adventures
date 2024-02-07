import BucketsController from "#controllers/buckets_controller";
import MainController from "#controllers/main_controller";
import router from '@adonisjs/core/services/router'

router.get('/', [MainController, 'home']).as('main_home')
router.get('/buckets', [BucketsController, 'list']).as('bucket_list')
router.get('/buckets/new', [BucketsController, 'new']).as('bucket_new')
router.post('/buckets/new', [BucketsController, 'store']).as('bucket_store')
