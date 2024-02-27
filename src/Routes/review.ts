import express, {Request} from 'express'
import { protect } from '../Middlewares/auth'
import { createReview, getAllReviewsOfaProduct } from '../Controller/review'

const router = express.Router()
 
router.route('/:productId').post(protect, createReview)

router.route('/:productId').get(getAllReviewsOfaProduct)


  
export default router
