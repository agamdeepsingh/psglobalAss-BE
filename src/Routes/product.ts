import express from 'express'
import {
  createProduct, deleteProduct, getAllPaginated, getByPriceRange, getProductById, getProductsByCategory, searchProduct, updateProduct, updateProductRating,
} from '../Controller/product'
import pagination from '../Middlewares/pagination'
import Product from '../Models/Product'

const router = express.Router()
 
router.route('/').post(createProduct)
router.route('/').get(
  pagination({
    model: Product,
    findExp: { isDisabled: false },
    select: 'name description category price rating isDisabled',
    reverse: 'createdAt'
  }),
  getAllPaginated,
)
router.route('/range').get(getByPriceRange)
router.route('/:productId').get(getProductById)
router.route('/update/:productId').patch(updateProduct)
router.route('/delete/:productId').delete(deleteProduct)
router.route('/search/:textInput').get(searchProduct)
router.route('/getByCategory/:textInput').get(getProductsByCategory)
router.route('/rating/:productId').patch(updateProductRating)
export default router
