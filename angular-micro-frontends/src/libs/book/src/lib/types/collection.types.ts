import { Collection, DateString } from './helper.types'

type BookAttributes = {
  title: string
  pages: number
  year: number
}
export type BookCollection = Collection<BookAttributes>

type BookOwnershipAttributes = {
  book: {
    data: BookCollection
  }
  startReadingDate: DateString | null
  finishReadingDate: DateString | null
  rating: 'very-bad' | 'bad' | 'neutral' | 'good' | 'very-good' | null
  currentPage: number | null
  note: string | null
  order: number | null
}
export type BookOwnershipCollection = Collection<BookOwnershipAttributes>

type AuthorAttributes = {
  firstname: string
  lastname: string
  dateOfBirth: DateString | null
}
export type AuthorCollection = Collection<AuthorAttributes>

export type BookOwnershipRating =
  | 'very-bad'
  | 'bad'
  | 'neutral'
  | 'good'
  | 'very-good'
