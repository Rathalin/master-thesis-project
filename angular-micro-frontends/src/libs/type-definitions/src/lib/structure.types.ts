export type RequestState<TData> = {
  result: WithMeta<TData> | null
  error: unknown | null
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

export type WithMeta<TData> = {
  data: TData | null
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
  error?: OperationError
}

export type OperationError = {
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

export type ImageFileFormat = {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  url: string
}

export type ImageFile = {
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    thumbnail: ImageFileFormat
    small?: ImageFileFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: unknown
}
