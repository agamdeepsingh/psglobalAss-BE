import { Schema, model } from 'mongoose'
import { IProductDocument, Category } from '../Types/Product'

const ProductSchema = new Schema<IProductDocument>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please Add name of Product'],
    },
    description: {
      type: String,
      required: [true, 'Please Add Product Details Of Product']
    },
    skuId: {
      type: String,
    },
    category: {
      type: String,
      enum: Object.values(Category),
      required: [true, 'Please Add Category of Product'],
    },
    price: {
        type: Number,
        required: [true, 'Please Add Price of Product'],
    },
    rating: {
      type: Number,
  },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true },
)

export default model<IProductDocument>('Product', ProductSchema)
