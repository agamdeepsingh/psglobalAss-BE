import mongoose from 'mongoose'
import { IUserDocument } from '../Types/User'
import { IProductDocument } from './Product'

export interface IReview {
    userId: IUserDocument
    product: IProductDocument
    rating: number
    comment: string
}

export interface IReviewDocument extends IReview, mongoose.Document {}
