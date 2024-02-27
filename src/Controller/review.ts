import { Response, NextFunction } from 'express'

import Product from '../Models/Product'
import { IPaginationResultsResponse } from '../Types/Pagination'
import { statusResponse } from '../Utils/statusTypes'
import asyncHandler from '../Middlewares/async'
import { IProductDocument } from '../Types/Product'
import { ProtectedRequest } from '../Types/Auth'
import ErrorResponse from '../Utils/errorResponse'
import { IReviewDocument } from '../Types/Review'
import Review from '../Models/Review'
const { CREATED, OK, ACCEPTED, NOT_FOUND } = statusResponse


export const createReview = asyncHandler(
  async (req: ProtectedRequest, res: Response, next:NextFunction) => {
    const _id = req.params.productId
    const product: IProductDocument | null = await Product.findById(_id)
    if (!product) return next(new ErrorResponse('No product found', 404))
    const review = await Review.findOne({userId: req.user._id, product: product._id})
    if(review) return next(new ErrorResponse('Review Already Exists', 404))
    const {
        rating,
        comment,
    } = req.body
      let data: IReviewDocument = await Review.create({
        userId: req.user._id,
        product: product._id,
        rating,
        comment,
      })
      res.status(CREATED).json({ success: true, data })
  }
)


export const getAllReviewsOfaProduct = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    const _id = req.params.productId
    const reviews: IReviewDocument[] | null = await Review.find({ product: _id })
    res.status(OK).json({ success: true, data: reviews })
  },
)