import { Injectable } from '@angular/core'
import {
  BookOwnershipAttributes,
  BookOwnershipContentType,
  ID,
  WithId,
} from 'src/libs/book/src/lib/types'
import { CollectionService } from './collection.service'
import * as qs from 'qs'

@Injectable({
  providedIn: 'root',
})
export class BookOwnershipService extends CollectionService {
  public queryBookOwnerships() {
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

  public createBookOwnership(bookOwnershipData: BookOwnershipAttributes) {
    const payload = {
      data: {
        book: bookOwnershipData.book.data.id,
        user: this.authService.currentUser?.id ?? -1,
        startReading: bookOwnershipData.startReading,
        finishReading: bookOwnershipData.finishReading,
        rating: bookOwnershipData.rating,
        currentPage: bookOwnershipData.currentPage,
        note: bookOwnershipData.note,
        order: bookOwnershipData.order,
      },
    }
    return this.create<typeof payload, BookOwnershipContentType>(
      `/book-ownerships`,
      payload
    )
  }

  public updateBookOwnership(
    bookOwnershipData: WithId<BookOwnershipAttributes>
  ) {
    const payload = {
      data: {
        book: bookOwnershipData.book.data.id,
        user: this.authService.currentUser?.id ?? -1,
        startReading: bookOwnershipData.startReading,
        finishReading: bookOwnershipData.finishReading,
        rating: bookOwnershipData.rating,
        currentPage: bookOwnershipData.currentPage,
        note: bookOwnershipData.note,
        order: bookOwnershipData.order,
      },
    }
    return this.update<typeof payload, BookOwnershipContentType>(
      `/book-ownerships/${bookOwnershipData.id}`,
      payload
    )
  }

  public deleteBookOwnership(id: ID) {
    return this.delete<BookOwnershipContentType>(`/book-ownerships/${id}`)
  }
}
