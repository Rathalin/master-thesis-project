import { Injectable } from '@angular/core'
import { BookOwnershipCollection, Query } from 'src/libs/book/src/lib/types'
import { BehaviorSubject } from 'rxjs'
import { CollectionService } from './collection.service'

@Injectable({
  providedIn: 'root',
})
export class BookOwnershipService extends CollectionService {
  private readonly bookOwnershipsSubject = new BehaviorSubject<
    Query<BookOwnershipCollection>
  >(super.initialQueryState)
  public readonly bookOwnershipsQuery$ =
    this.bookOwnershipsSubject.asObservable()

  public async queryBookOwnerships() {
    await super.query('/book-ownerships', this.bookOwnershipsSubject)
  }
}
