import mongoose from 'mongoose'
import { IUserDocument } from '../Types/User'
import { IProductDocument } from './Product'

export const OrderStatus = {
    PENDING: 'PENDING',
    SHIPPING: 'SHIPPING',
    DELIVERED: 'DELIVERED',
}
export interface Iorder {
    userId: IUserDocument
    items: [IProductDocument]
    totalPrice: number
    status: 'PENDING' | 'SHIPPING' | 'DELIVERED'
}

export interface IOrderDocument extends Iorder, mongoose.Document {}
