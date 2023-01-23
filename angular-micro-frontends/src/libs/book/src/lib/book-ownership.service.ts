import { Injectable } from '@angular/core'
import { BookOwnershipCollection, Query } from 'src/libs/book/src/lib/types'
import { BehaviorSubject } from 'rxjs'
import { CollectionService } from './collection.service'
import * as qs from 'qs'
import { AuthService } from '@angular-micro-frontends/auth'

@Injectable({
  providedIn: 'root',
})
export class BookOwnershipService extends CollectionService {
  // Book ownerships

  private readonly bookOwnershipsSubject = new BehaviorSubject<
    Query<BookOwnershipCollection>
  >(this.initialQueryState)
  public readonly bookOwnershipsQuery$ =
    this.bookOwnershipsSubject.asObservable()

  public async queryBookOwnerships() {
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
    await this.query(`/book-ownerships?${query}`, this.bookOwnershipsSubject)
  }

  // Currently reading books

  private readonly currentlyReadingBooksSubject = new BehaviorSubject<
    Query<BookOwnershipCollection>
  >(this.initialQueryState)
  public readonly currentlyReadingBooksQuery$ =
    this.currentlyReadingBooksSubject.asObservable()

  public async queryCurrentlyReadingBooks() {
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
    await this.query(
      `/book-ownerships?${query}`,
      this.currentlyReadingBooksSubject
    )
  }

  // Read next books

  private readonly readNextBooksSubject = new BehaviorSubject<
    Query<BookOwnershipCollection>
  >(this.initialQueryState)
  public readonly readNextBooksQuery$ = this.readNextBooksSubject.asObservable()

  public async queryReadNextBooks() {
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
    await this.query(`/book-ownerships?${query}`, this.readNextBooksSubject)
  }

  // Recently read books

  private readonly recentlyReadBooksSubject = new BehaviorSubject<
    Query<BookOwnershipCollection>
  >(this.initialQueryState)
  public readonly recentlyReadBooksQuery$ =
    this.recentlyReadBooksSubject.asObservable()

  public async queryRecentlyReadBooks() {
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
    await this.query(`/book-ownerships?${query}`, this.recentlyReadBooksSubject)
  }
}
