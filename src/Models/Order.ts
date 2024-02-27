import { Schema, model } from 'mongoose'

import { IOrderDocument, OrderStatus } from '../Types/Order'

const OrderSchema = new Schema<IOrderDocument>(
  {
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }],
    totalPrice: {
      type: Number,
      trim: true,
      required: [true, 'Please Add Total cost'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: 'PENDING'
    },
  },
  { timestamps: true },
)

export default model<IOrderDocument>('Order', OrderSchema)
