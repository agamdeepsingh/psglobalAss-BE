import { Document } from 'mongoose'


export const Category = {
  BOOKS: 'BOOKS',
  FASHION: 'FASHION',
  ELECTRONICS: 'ELECTRONICS',
}

export interface IProduct {
  name: string
  description: string
  category: 'BOOKS' | 'FASHION' | 'ELECTRONICS'
  price: number
  skuId: string
  rating: number
  isDisabled: boolean
}

export interface IProductDocument extends IProduct, Document { }
