import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject, merge } from 'rxjs'
import { QueryMany, BookContentType } from 'src/libs/book/src/lib/types'
import { CollectionService } from './collection.service'

@Injectable({
  providedIn: 'root',
})
export class BookService extends CollectionService {
  private readonly booksSubject = new BehaviorSubject<
    QueryMany<BookContentType>
  >(super.initialQueryState)
  public readonly booksQuery$ = this.booksSubject.asObservable()

  public queryBooks() {
    super.query('/books', this.booksSubject).then()
    return this.booksSubject.asObservable()
  }
}
