import { Injectable } from '@angular/core'
import {
  BookContentType,
  PlaceholderContentType,
} from '@angular-micro-frontends/type-definitions'
import { CollectionService } from './collection.service'
import * as qs from 'qs'

@Injectable({
  providedIn: 'root',
})
export class BookService extends CollectionService {
  public queryBooks() {
    const query = qs.stringify({
      sort: 'title',
      populate: ['authors', 'cover'],
    })
    return this.query<BookContentType[]>(`/books?${query}`)
  }

  public filterBooks(search: string) {
    const query = qs.stringify({
      sort: 'title',
      populate: ['authors', 'cover'],
      filters: {
        title: {
          $containsi: search,
        },
      },
    })
    return this.query<BookContentType[]>(`/books?${query}`)
  }

  public getBookCoverPlaceholder() {
    const query = qs.stringify({
      populate: ['bookCover'],
    })
    return this.query<PlaceholderContentType>(`/placeholder?${query}`)
  }
}
