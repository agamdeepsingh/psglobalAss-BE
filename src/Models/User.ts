import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { IUserDocument, UserGender } from '../Types/User'

const UserSchema = new Schema<IUserDocument>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      index: true,
      lowercase: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    phoneNumber: {
      type: String,
      index: true,
      match: /^\+?[0-9][0-9]{4,16}$/,
    },
    age: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      minlength: 8,
      select: false,
    },
    gender: {
      type: String,
      match: /^[a-zA-Z]*$/,
      enum: Object.values(UserGender),
      description: 'required and must be Male or famale',
    },
  },
  {
    timestamps: true,
  }
)

// Encrypt password using bcrypt
UserSchema.pre<IUserDocument>(
  'save',
  async function (this: IUserDocument, next) {
    if (!this.isModified('password')) next()

    if (this.password) {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
    }
  }
)

// Get web token
UserSchema.methods.getSignedJwtToken = function (this: IUserDocument) {
  // eslint-disable-next-line
  return jwt.sign({ id: this._id }, 'nsdkjfniuh2u;234p[.p[2rl2,p3ekr2[l2-34022keiwjr]adasd]df]{w4da}}sadsad3q3eqdqdsds'!, {
    expiresIn: '30d',
  })
}

// Match user Entered password to hash password in db
UserSchema.methods.matchPassword = async function (
  this: IUserDocument,
  enteredPassword: string
) {
  if (this.password) return await bcrypt.compare(enteredPassword, this.password)
  else return false
}

UserSchema.index({
  phoneNumber: 1,
})

export default model<IUserDocument>('User', UserSchema)
