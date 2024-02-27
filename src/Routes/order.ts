import express, {Request} from 'express'
import { protect } from '../Middlewares/auth'
import { createOrder, getPaginatedOrdersByStatus, orderHistoryPerUser } from '../Controller/order'
import pagination from '../Middlewares/pagination'
import Order from '../Models/Order'


const router = express.Router()
 
router.route('/').post(protect, createOrder)
router.route('/paginated/:status').get(protect,pagination({
    model: Order,
    populate: 'userId items',
    select: 'userId items totalPrice status',
    callback: (req:Request) => {
      return {
        ...(req.params.status && {
          status: { $regex: req.params.status, $options: 'i'}
        })
      }
    },
  }),
  getPaginatedOrdersByStatus
  )
router.route('/').get(protect, orderHistoryPerUser)


export default router

