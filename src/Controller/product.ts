import { Response, NextFunction, text } from 'express'

import Product from '../Models/Product'

import ErrorResponse from '../Utils/errorResponse'

import { statusResponse } from '../Utils/statusTypes'

import asyncHandler from '../Middlewares/async'

import { IProductDocument } from '../Types/Product'
import { ProtectedRequest } from '../Types/Auth'
import { IPaginationResultsResponse } from '../Types/Pagination'
import Review from '../Models/Review'
const { CREATED, OK, ACCEPTED, NOT_FOUND } = statusResponse


export const createProduct = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {

    const {
      name,
      description,
      category,
      price,
      skuId,
    } = req.body
    let product: IProductDocument = await Product.create({
      name,
      description,
      category,
      price,
      skuId,
    })
    res.status(CREATED).json({ success: true, data: product })
  },
)


export const getAllPaginated = asyncHandler(
  async (req: ProtectedRequest, res: IPaginationResultsResponse) => {
    res.status(200).json(res.paginationResult)
  },
)


export const getProductById = asyncHandler(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const _id = req.params.productId
    const product: IProductDocument | null = await Product.findById(_id)
    res.status(OK).json({ success: 'true', data: product })
  },
)


export const updateProduct = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    const _id = req.params.productId
    const {
        name,
        description,
        category,
        price,
        skuId,
    } = req.body

    const doc = {
      ...(name && { name }),
      ...(description && { description }),
      ...(category && { category }),
      ...(price && { price }),
      ...(skuId && { skuId }),
    }

    const update: IProductDocument | null = await Product.findByIdAndUpdate(
      _id,
      doc,
      { new: true, runValidators: true },
    )
    res
      .status(ACCEPTED)
      .json({ success: true, response: 'Updated Successfully', data: update })
  },
)


export const deleteProduct = asyncHandler(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const _id = req.params.productId
    const product: IProductDocument | null = await Product.findById(_id)

    if (!product) return next(new ErrorResponse('No product found', 404))

    if (product.isDisabled === true) {
      res.status(NOT_FOUND).json({ response: 'Product Already Deactive' })
      return next(new ErrorResponse('Product Already Deactive', 400))
    }

    product.isDisabled = true

    await product.save()

    res
      .status(ACCEPTED)
      .json({ success: true, response: 'Deleted Successfully' })
  },
)


export const searchProduct = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    const textInput = req.params.textInput
    textInput.replace('%', ' ')

    const data = await Product.find({
      name: { $regex: textInput, $options: 'i' },
    }).limit(5)

    res.status(200).json({
      success: true,
      data,
    })
  },
)


export const getProductsByCategory = asyncHandler(
    async (req: ProtectedRequest, res: Response) => {
      const textInput = req.params.textInput
      const product: IProductDocument[] | null = await Product.find({ category: textInput })
      res.status(OK).json({ success: true, data: product })
    },
  )



  export const getByPriceRange = asyncHandler(
    async (req: ProtectedRequest, res: Response) => {
      const { minPrice, maxPrice } = req.body;
      const filter: any = {};
  
      if (minPrice) {
        filter.price = { $gte: minPrice };
      }
  
      if (maxPrice) {
        filter.price = { ...filter.price, $lte: maxPrice };
      }
  
      // Execute the find query with the filter
      const searchResults = await Product.find(filter);
  
      res.status(OK).json({ success: true, data: searchResults })
    },
  )


  // export const updateProductRating = asyncHandler(
  //   async(req: ProtectedRequest, res: Response) => {
  //     const _id = req.params.productId
  //     const rating = await productRating(_id)
  //   }
  // )


    export const updateProductRating = asyncHandler(
    async (req: ProtectedRequest, res: Response, next: NextFunction) => {
      const productId = req.params.productId;
  
      const reviews = await Review.find({ product: productId });
  
      if (reviews.length === 0) return next(new ErrorResponse('No reviews found for the product.', 404))
  
      let totalRating = 0;
      for (const review of reviews) {
        totalRating += review.rating;
      }
      const averageRating = totalRating / reviews.length;
  
      const data = await Product.findByIdAndUpdate(productId, { rating: averageRating });
      await data?.save()
  
      return res.status(200).json({ message: 'Product rating updated successfully.', rating: averageRating });
  });