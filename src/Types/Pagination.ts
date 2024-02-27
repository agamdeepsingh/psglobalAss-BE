import { Response } from 'express'
export interface IPaginationField {
  next?: {
    page: number
    limit: number
  }
  prev?: {
    page: number
    limit: number
  }
}

export interface IPaginationResults {
  success: boolean
  count: number
  pagination: IPaginationField
  data: any
}
export interface IPaginationResultsResponse extends Response {
  paginationResult: IPaginationResults
}

export interface IPaginationParams {
  model: any
  populate?: string
  findExp?: {
    isDisabled?: boolean
  }
  select?: string
  reverse?: string
  callback?: Function
}

export interface IPaginationQuery {
  find: Function
  select: Function
  sort: Function
  skip: Function
  limit: Function
  populate: Function
}
