import { ContentType, DateString, MediaImage } from './structure.types'

export type BookAttributes = {
  title: string
  pages: number | null
  year: number | null
  authors: {
    data: AuthorContentType[]
  }
  cover: {
    data: ContentType<MediaImage> | null
  }
}

export type BookContentType = ContentType<BookAttributes>

export type MyBookAttributes = {
  book: {
    data: BookContentType
  }
  startReading: DateString | null
  finishReading: DateString | null
  rating: MyBookRating | null
  currentPage: number | null
  note: string | null
  order: number | null
}
export type MyBookContentType = ContentType<MyBookAttributes>

export type AuthorAttributes = {
  firstname: string
  lastname: string
  dateOfBirth: DateString | null
}
export type AuthorContentType = ContentType<AuthorAttributes>

export const MyBookRatingOptions = [
  'No Rating',
  'Very Bad',
  'Bad',
  'Ok',
  'Good',
  'Very Good',
] as const

export type MyBookRating = typeof MyBookRatingOptions[number]

export type PlaceholderAttributes = {
  bookCover: {
    data: ContentType<MediaImage> | null
  }
}
export type PlaceholderContentType = ContentType<PlaceholderAttributes>
