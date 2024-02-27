import { Schema, model } from 'mongoose'

import { IReviewDocument } from '../Types/Review'

const ReviewSechema = new Schema<IReviewDocument>(
  {
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
        type: Number,
        trim: true,
        required: [true, 'Please Add Rating'],
      },
      comment: {
        type: String,
      },
  },
  { timestamps: true },
)

export default model<IReviewDocument>('Review', ReviewSechema)
