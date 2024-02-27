import { Request } from 'express'

import { IUserDocument } from '../Types/User'

export interface ProtectedRequest extends Request {
  user: IUserDocument ;
}

export interface ITokenDecode {
  id: string;
  userType: string;
}
