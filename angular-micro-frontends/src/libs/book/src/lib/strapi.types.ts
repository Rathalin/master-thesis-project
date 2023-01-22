export type DateString = string

export type GetCollectionResponse<T> = {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type BookCollection = {
  id: number
  attributes: {
    title: string
    createdAt: DateString
    updatedAt: DateString
    startReadingDate: DateString | null
    finishReadingDate: DateString | null
    rating: string | null
    note: number[] | null
    pages: number
    currentPage: number | null
  }
}
