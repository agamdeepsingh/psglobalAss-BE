import { Document } from 'mongoose'

export const UserGender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
}
export interface IUser {
  firstName: string
  lastName?: string
  email: string
  age: string
  phoneNumber?: string
  gender?: string
  password?: string
  tokenHash: [ {
    hash: string
  }]
  isDisabled: boolean
}

export interface IUserDocument extends IUser, Document {
  matchPassword(enteredPassword: string): boolean
  getSignedJwtToken(): string
}
