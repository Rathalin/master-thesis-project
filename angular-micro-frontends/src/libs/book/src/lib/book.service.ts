import { Injectable } from '@angular/core'
import { BookContentType } from 'src/libs/book/src/lib/types'
import { CollectionService } from './collection.service'

@Injectable({
  providedIn: 'root',
})
export class BookService extends CollectionService {
  public queryBooks() {
    return this.query<BookContentType[]>('/books')
  }
}
