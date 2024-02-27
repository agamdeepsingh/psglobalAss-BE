import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import asyncHandler from './async'
import ErrorResponse from '../Utils/errorResponse'
import { ProtectedRequest } from '../Types/Auth'
import { ITokenDecode } from '../Types/Auth'
import { IUserDocument } from '../Types/User'
import User from '../Models/User'

export const protect = asyncHandler(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    let token: any
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    )
      token = req.headers.authorization.split(' ')[1]

    if (!token)
      return next(new ErrorResponse('Please login first to use this feature', 401))

    try {
      const decoded = jwt.verify(token, 'nsdkjfniuh2u;234p[.p[2rl2,p3ekr2[l2-34022keiwjr]adasd]df]{w4da}}sadsad3q3eqdqdsds'!)
      
      const users: IUserDocument = await User.findById(
        (<ITokenDecode>decoded).id
      ).select('+password')

      if (!users) return next(new ErrorResponse('User Not found', 404))

      await users.save()
      delete users.password
      req.user = users

      next()
    } catch (err) {
      return next(new ErrorResponse('Please login first to use this featuressssssss', 401))
    }
  }
)

