import { Injectable } from '@angular/core'
import { CollectionService } from './collection.service'
import { BehaviorSubject } from 'rxjs'
import { AuthorCollection, Query } from 'src/libs/book/src/lib/types'

@Injectable({
  providedIn: 'root',
})
export class AuthorService extends CollectionService {
  private readonly authorsSubject = new BehaviorSubject<
    Query<AuthorCollection>
  >(super.initialQueryState)
  public readonly authorsQuery$ = this.authorsSubject.asObservable()

  public async queryAuthors() {
    await super.query('/authors', this.authorsSubject)
  }
}
