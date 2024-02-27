import { Response, NextFunction, text } from 'express'
import Product from '../Models/Product'
import { statusResponse } from '../Utils/statusTypes'
import asyncHandler from '../Middlewares/async'
import { ProtectedRequest } from '../Types/Auth'
import { IPaginationResultsResponse } from '../Types/Pagination'

import Order from '../Models/Order'
const { CREATED, OK, ACCEPTED, NOT_FOUND } = statusResponse


export const createOrder = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    const { items } = req.body;

    if (!items) {
      return res.status(400).json({ message: 'Product Not Added' });
    }

    let totalPrice = 0;
    for (const productId of items) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }
      totalPrice += product.price;
    }

    const order = await Order.create({ items, totalPrice, userId: req.user._id });
    const savedOrder = await order.save();
    res.status(CREATED).json({ success: true, data: savedOrder })
  }
)


export const orderHistoryPerUser = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    const userId = req.user._id;
    const order = await Order.find({ userId: userId });
    res.status(OK).json({ success: true, data: order })
  }
)


export const getPaginatedOrdersByStatus = asyncHandler(
  async (req: ProtectedRequest, res: IPaginationResultsResponse) => {    
    res.status(200).json(res.paginationResult)
  }
)