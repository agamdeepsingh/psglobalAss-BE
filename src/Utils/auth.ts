import { Response } from "express"
import { IUserDocument } from "../Types/User"

export const sendTokenResponse = async (
  user: IUserDocument,
  statusCode: number,
  res: Response,
) => {
  await user.save()
  const token = user.getSignedJwtToken()
  res.status(statusCode).json({
    success: true,
    token,
  })
}