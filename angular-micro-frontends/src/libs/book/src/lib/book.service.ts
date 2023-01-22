import { Injectable } from '@angular/core'
import axios from 'axios'
import { BookCollection, GetCollectionResponse } from './strapi.types'
import { BehaviorSubject } from 'rxjs'

export type Res<TData, TError> = {
  data?: TData
  error?: TError
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksSubject =
    new BehaviorSubject<GetCollectionResponse<BookCollection> | null>(null)
  public books$ = this.booksSubject.asObservable()

  async fetchBooks(options?: { page: number; pageSize: number }) {
    let url = `api/books`
    if (options != null) {
      url += `?pagination[page]=${options.page}&pagination[pageSize]=${options.pageSize}}`
    }
    const { data } = await axios.get<GetCollectionResponse<BookCollection>>(url)
    this.booksSubject.next(data)
  }
}
