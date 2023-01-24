import { Collection, DateString } from './helper.types'

export type BookAttributes = {
  title: string
  pages: number
  year: number
}
export type BookCollection = Collection<BookAttributes>

export type BookOwnershipAttributes = {
  book: {
    data: BookCollection
  }
  startReadingDate: DateString | null
  finishReadingDate: DateString | null
  rating: BookOwnershipRating | null
  currentPage: number | null
  note: string | null
  order: number | null
}
export type BookOwnershipCollection = Collection<BookOwnershipAttributes>

export type AuthorAttributes = {
  firstname: string
  lastname: string
  dateOfBirth: DateString | null
}
export type AuthorCollection = Collection<AuthorAttributes>

export const BookOwnershipRatingOptions = [
  'No Rating',
  'Very Bad',
  'Bad',
  'Ok',
  'Good',
  'Very Good',
] as const

export type BookOwnershipRating = typeof BookOwnershipRatingOptions[number]
