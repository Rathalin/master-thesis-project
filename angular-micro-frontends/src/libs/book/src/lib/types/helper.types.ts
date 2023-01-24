export type QueryMany<TData> = {
  data: WithMeta<TData[]> | null
  error: QueryError | null
  isLoading: boolean
}

export type QueryOne<TData> = {
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

export type Collection<T> = {
  id: number
  attributes: {
    createdAt: DateString
    updatedAt: DateString
  } & T
}

export type DateString = string
