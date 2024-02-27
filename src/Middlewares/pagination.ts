import { Request, NextFunction } from 'express'
import {
  IPaginationField,
  IPaginationResultsResponse,
  IPaginationParams,
  IPaginationQuery,
} from '../Types/Pagination'

import asyncHandler from './async'
import { ProtectedRequest } from '../Types/Auth'

const pagination =
  ({ model, populate, findExp, select ,reverse, callback}: IPaginationParams) =>
    asyncHandler( 
      async (
        req: Request | ProtectedRequest,
        res: IPaginationResultsResponse,
        next: NextFunction
      ) => {
        let query: IPaginationQuery
        const queryFindExpCpy = { ...req.query }
        delete queryFindExpCpy.page
        delete queryFindExpCpy.limit
        delete queryFindExpCpy.startDate
        delete queryFindExpCpy.endDate

        query = model.find({
          ...findExp,
          ...queryFindExpCpy,
          ...(callback && typeof callback === 'function' && callback(req, res, next)),
        })
        // console.log(req.query)

        if (select) query.select(select)

        // sort latest first
        if(reverse) query = query.sort(reverse)
         else  query = query.sort('-createdAt') 

        // Pagination
        let page = 1, // page starts from 1 not 0
          limit = 10
        if (
          typeof req.query.page === 'string' &&
      typeof req.query.limit === 'string'
        ) {
          page = parseInt(req.query.page, 10) || 1
          limit = parseInt(req.query.limit, 10) || 10
        }
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        query = query.skip(startIndex).limit(limit)

        const total = await model.countDocuments({
          ...findExp,
          ...queryFindExpCpy,
        }) // Count total nuber of bootcamps
        if (populate) {
          query = query.populate(populate)
        }

        // Excuting Query
        const results = await query

        // Pagination Result
        const pagination: IPaginationField = {}

        if (endIndex < total) {
          pagination.next = {
            page: page + 1,
            limit,
          }
        }

        if (startIndex > 0) {
          pagination.prev = {
            page: page - 1,
            limit,
          }
        }

        res.paginationResult = {
          success: true,
          count: total,
          pagination,
          data: results,
        }

        next()
      }
    )
export default pagination
