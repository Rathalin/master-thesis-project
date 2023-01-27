import { Injectable } from '@angular/core'
import {
  BookOwnershipAttributes,
  BookOwnershipContentType,
  Mutation,
  WithId,
} from 'src/libs/book/src/lib/types'
import { BehaviorSubject } from 'rxjs'
import { CollectionService } from './collection.service'
import * as qs from 'qs'

@Injectable({
  providedIn: 'root',
})
export class BookOwnershipService extends CollectionService {
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
    return this.query<BookOwnershipContentType[]>(`/book-ownerships?${query}`)
  }

  // Book ownership by id
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
    return this.query<BookOwnershipContentType>(
      `/book-ownerships/${id}?${query}`
    )
  }

  // Currently reading books

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
    return this.query<BookOwnershipContentType[]>(`/book-ownerships?${query}`)
  }

  // Read next books

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
    return this.query<BookOwnershipContentType[]>(`/book-ownerships?${query}`)
  }

  // Recently read books

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
    return this.query<BookOwnershipContentType[]>(`/book-ownerships?${query}`)
  }

  // Create new book ownership

  public createBookOwnership(bookOwnershipData: BookOwnershipAttributes) {
    const payload = {
      book: bookOwnershipData.book.data.id,
      user: this.authService.currentUser?.id ?? -1,
      startReading: bookOwnershipData.startReading,
      finishReading: bookOwnershipData.finishReading,
      rating: bookOwnershipData.rating,
      currentPage: bookOwnershipData.currentPage,
      note: bookOwnershipData.note,
      order: bookOwnershipData.order,
    }
    return this.create<BookOwnershipContentType, typeof payload>(
      `/book-ownerships`
    )
  }

  // Update book ownership

  public updateBookOwnership(
    bookOwnershipData: WithId<BookOwnershipAttributes>
  ) {
    const payload = {
      book: bookOwnershipData.book.data.id,
      user: this.authService.currentUser?.id ?? -1,
      startReading: bookOwnershipData.startReading,
      finishReading: bookOwnershipData.finishReading,
      rating: bookOwnershipData.rating,
      currentPage: bookOwnershipData.currentPage,
      note: bookOwnershipData.note,
      order: bookOwnershipData.order,
    }
    return this.update<BookOwnershipContentType, typeof payload>(
      `/book-ownerships/${bookOwnershipData.id}`
    )
  }
}
