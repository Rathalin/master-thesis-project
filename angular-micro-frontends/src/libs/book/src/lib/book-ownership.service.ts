import { Injectable } from '@angular/core'
import {
  BookOwnershipCollection,
  QueryMany,
  QueryOne,
} from 'src/libs/book/src/lib/types'
import { BehaviorSubject } from 'rxjs'
import { CollectionService } from './collection.service'
import * as qs from 'qs'

@Injectable({
  providedIn: 'root',
})
export class BookOwnershipService extends CollectionService {
  // Book ownerships

  private readonly bookOwnershipsSubject = new BehaviorSubject<
    QueryMany<BookOwnershipCollection>
  >(this.initialQueryState)
  private readonly bookOwnershipsQuery$ =
    this.bookOwnershipsSubject.asObservable()

  public queryBookOwnerships() {
    console.log(this.authService)
    const query = qs.stringify(
      {
        populate: ['book'],
        filters: {
          user: {
            id: {
              $eq: this.authService.currentUser?.id ?? -1,
            },
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    )
    this.query(`/book-ownerships?${query}`, this.bookOwnershipsSubject).then()
    return this.bookOwnershipsQuery$
  }

  // Book ownership by id

  private readonly bookOwnershipSubject = new BehaviorSubject<
    QueryOne<BookOwnershipCollection>
  >(this.initialQueryState)
  private readonly bookOwnershipQuery$ =
    this.bookOwnershipSubject.asObservable()

  public queryBookOwnership(id: number) {
    const query = qs.stringify(
      {
        populate: ['book'],
        filters: {
          user: {
            id: {
              $eq: this.authService.currentUser?.id ?? -1,
            },
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    )
    this.query(
      `/book-ownerships/${id}?${query}`,
      this.bookOwnershipSubject
    ).then()
    return this.bookOwnershipQuery$
  }

  // Currently reading books

  private readonly currentlyReadingBooksSubject = new BehaviorSubject<
    QueryMany<BookOwnershipCollection>
  >(this.initialQueryState)
  private readonly currentlyReadingBooksQuery$ =
    this.currentlyReadingBooksSubject.asObservable()

  public queryCurrentlyReadingBooks() {
    const query = qs.stringify(
      {
        populate: ['book'],
        filters: {
          $and: [
            {
              user: {
                id: {
                  $eq: this.authService.currentUser?.id ?? -1,
                },
              },
            },
            {
              startReading: {
                $notNull: true,
              },
            },
            {
              finishReading: {
                $null: true,
              },
            },
          ],
        },
      },
      {
        encodeValuesOnly: true,
      }
    )
    this.query(
      `/book-ownerships?${query}`,
      this.currentlyReadingBooksSubject
    ).then()
    return this.currentlyReadingBooksQuery$
  }

  // Read next books

  private readonly readNextBooksSubject = new BehaviorSubject<
    QueryMany<BookOwnershipCollection>
  >(this.initialQueryState)
  private readonly readNextBooksQuery$ =
    this.readNextBooksSubject.asObservable()

  public queryReadNextBooks() {
    const query = qs.stringify(
      {
        populate: ['book'],
        filters: {
          $and: [
            {
              user: {
                id: {
                  $eq: this.authService.currentUser?.id ?? -1,
                },
              },
            },
            {
              startReading: {
                $null: true,
              },
            },
          ],
        },
      },
      {
        encodeValuesOnly: true,
      }
    )
    this.query(`/book-ownerships?${query}`, this.readNextBooksSubject).then()
    return this.readNextBooksQuery$
  }

  // Recently read books

  private readonly recentlyReadBooksSubject = new BehaviorSubject<
    QueryMany<BookOwnershipCollection>
  >(this.initialQueryState)
  private readonly recentlyReadBooksQuery$ =
    this.recentlyReadBooksSubject.asObservable()

  public queryRecentlyReadBooks() {
    const query = qs.stringify(
      {
        populate: ['book'],
        filters: {
          $and: [
            {
              user: {
                id: {
                  $eq: this.authService.currentUser?.id ?? -1,
                },
              },
            },
            {
              finishReading: {
                $notNull: true,
              },
            },
          ],
        },
      },
      {
        encodeValuesOnly: true,
      }
    )
    this.query(
      `/book-ownerships?${query}`,
      this.recentlyReadBooksSubject
    ).then()
    return this.recentlyReadBooksQuery$
  }
}
