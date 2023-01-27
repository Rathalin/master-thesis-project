export type Query<TData> = {
  data: WithMeta<TData> | null
  error: QueryError | null
  isLoading: boolean
}

export type Mutation<TData> = {
  data: WithMeta<TData> | null
  error: QueryError | null
  isLoading: boolean
}

export type WithMeta<TData> = {
  data: TData
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type QueryError = {
  status: number
  name: string
  message: string
  details: unknown
}

export type ContentType<T> = {
  id: ID
  attributes: {
    createdAt: DateString
    updatedAt: DateString
  } & T
}

export type WithId<T> = {
  id: ID
} & T

export type DateString = string
export type ID = number
