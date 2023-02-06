import { Injectable } from '@angular/core'
import { BookContentType } from '@angular-micro-frontends/type-definitions'
import { CollectionService } from './collection.service'

@Injectable({
  providedIn: 'root',
})
export class BookService extends CollectionService {
  public queryBooks() {
    return this.query<BookContentType[]>('/books')
  }
}
