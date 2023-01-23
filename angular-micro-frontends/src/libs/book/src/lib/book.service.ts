import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { Query, BookCollection } from 'src/libs/book/src/lib/types'
import { CollectionService } from './collection.service'

@Injectable({
  providedIn: 'root',
})
export class BookService extends CollectionService {
  private readonly booksSubject = new BehaviorSubject<Query<BookCollection>>(
    super.initialQueryState
  )
  public readonly booksQuery$ = this.booksSubject.asObservable()

  public async queryBooks() {
    await super.query('/books', this.booksSubject)
  }
}
