import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
// import { Apollo } from 'apollo-angular'
// import { GET_BOOKS } from './graphql/queries/allBooks.query'
// import { GetAllBooksQuery } from './graphql/generated/generated'

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksSubject = new Subject<
    Res<{
      id: number
      attributes: {
        title: string
        createdAt: DateString
        updatedAt: DateString
        pages: number
      }
    }>
  >()
  private books$ = this.booksSubject.asObservable()
}

export type DateString = string

export type Res<TData> = {
  data?: TData
  error?: Error
}

export type Data<TData> = {
  data: TData[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
