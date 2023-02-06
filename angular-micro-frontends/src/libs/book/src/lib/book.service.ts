import { Injectable } from '@angular/core'
import { BookContentType } from '@angular-micro-frontends/type-definitions'
import { CollectionService } from './collection.service'
import * as qs from 'qs'

@Injectable({
  providedIn: 'root',
})
export class BookService extends CollectionService {
  public queryBooks() {
    const query = qs.stringify({
      sort: 'title',
      populate: ['authors'],
    })
    return this.query<BookContentType[]>(`/books?${query}`)
  }

  public filterBooks(search: string) {
    const query = qs.stringify({
      sort: 'title',
      populate: ['authors'],
      filters: {
        title: {
          $containsi: search,
        },
      },
    })
    return this.query<BookContentType[]>(`/books?${query}`)
  }
}
