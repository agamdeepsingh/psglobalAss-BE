import {Response, NextFunction } from "express"
import asyncHandler from "../Middlewares/async"
import User from "../Models/User"
import { ProtectedRequest } from "../Types/Auth"
import { IUserDocument } from "../Types/User"
import ErrorResponse from "../Utils/errorResponse"
import { sendTokenResponse } from "../Utils/auth"


  export const register = asyncHandler(
    async (req: ProtectedRequest, res: Response, next: NextFunction) => {
      const { firstName, email, password } = req.body

      if (!password) return next(new ErrorResponse('Please provide password', 400))

      if (!email) return next(new ErrorResponse('Email required', 400))

      if (!req.body.phoneNumber) return next(new ErrorResponse('Phone Number required', 400))

      const phoneNumber = String(req.body.phoneNumber)

      const phoneExist: IUserDocument | null = await User.findOne({ phoneNumber })

      if (phoneExist) return next(new ErrorResponse('Phone Number already exists', 400))
      const emailExist: IUserDocument | null = await User.findOne({email: email })

      if (emailExist) return next(new ErrorResponse('Email already exists', 400))
      const data = await User.create({ firstName, email, password, phoneNumber })

      return res.status(200).json({
        success: true,
        data
      })
    }
  )


  export const login = asyncHandler(
    async (req: ProtectedRequest, res: Response, next: NextFunction) => {
      const { email, password } = req.body        
      
      if (!email) return next(new ErrorResponse('Email required', 400))
      if (!password) return next(new ErrorResponse('password required', 400))
      
      const user = await User.findOne({ email }).select('+password')
      if (!user) return next(new ErrorResponse('User not found with this email', 404))
      
      const isMatch = user.matchPassword(password)
      if (!isMatch) return next(new ErrorResponse('Invalid Credentials', 401))
      
      sendTokenResponse(user, 200, res)
    }
  )


export const getMe = asyncHandler(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user._id)
    res.status(200).json({
      success: true,
      data: user,
    })
  }
)