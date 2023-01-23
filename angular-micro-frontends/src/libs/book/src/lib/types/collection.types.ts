import { Collection, DateString } from './helper.types'

type BookAttributes = {
  pages: number
  title: string
  createdAt: DateString
  updatedAt: DateString
}
export type BookCollection = Collection<BookAttributes>

type BookOwnershipAttributes = {
  title: String
  startReadingDate: DateString | null
  finishReadingDate: DateString | null
  rating: string | null
  note: number[] | null
  pages: number
  currentPage: number | null
}
export type BookOwnershipCollection = Collection<BookOwnershipAttributes>

type AuthorAttributes = {
  firstname: string
  lastname: string
  dateOfBirth: DateString | null
}
export type AuthorCollection = Collection<AuthorAttributes>
