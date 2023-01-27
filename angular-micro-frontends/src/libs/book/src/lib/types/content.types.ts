import { ContentType, DateString } from './structure.types'

export type BookAttributes = {
  title: string
  pages: number | null
  year: number | null
}
export type BookContentType = ContentType<BookAttributes>

export type BookOwnershipAttributes = {
  book: {
    data: BookContentType
  }
  startReading: DateString | null
  finishReading: DateString | null
  rating: BookOwnershipRating | null
  currentPage: number | null
  note: string | null
  order: number | null
}
export type BookOwnershipContentType = ContentType<BookOwnershipAttributes>

export type AuthorAttributes = {
  firstname: string
  lastname: string
  dateOfBirth: DateString | null
}
export type AuthorContentType = ContentType<AuthorAttributes>

export const BookOwnershipRatingOptions = [
  'No Rating',
  'Very Bad',
  'Bad',
  'Ok',
  'Good',
  'Very Good',
] as const

export type BookOwnershipRating = typeof BookOwnershipRatingOptions[number]
