import { Injectable } from '@angular/core'
import {
  MyBookAttributes,
  MyBookContentType,
  ID,
  WithId,
} from '@angular-micro-frontends/type-definitions'
import { CollectionService } from './collection.service'
import * as qs from 'qs'

@Injectable({
  providedIn: 'root',
})
export class MyBookService extends CollectionService {
  public getMyBooks() {
    const query = qs.stringify(
      {
        populate: {
          book: {
            populate: ['authors'],
          },
        },
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
    return this.query<MyBookContentType[]>(`/book-ownerships?${query}`)
  }

  public getMyBook(id: number) {
    const query = qs.stringify(
      {
        populate: {
          book: {
            populate: ['authors'],
          },
        },
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
    return this.query<MyBookContentType>(`/book-ownerships/${id}?${query}`)
  }

  public getMyCurrentlyReadingBooks() {
    const query = qs.stringify(
      {
        populate: {
          book: {
            populate: ['authors'],
          },
        },
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
    return this.query<MyBookContentType[]>(`/book-ownerships?${query}`)
  }

  public getMyUnreadBooks() {
    const query = qs.stringify(
      {
        populate: {
          book: {
            populate: ['authors'],
          },
        },
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
    return this.query<MyBookContentType[]>(`/book-ownerships?${query}`)
  }

  public getMyReadBooks() {
    const query = qs.stringify(
      {
        populate: {
          book: {
            populate: ['authors'],
          },
        },
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
    return this.query<MyBookContentType[]>(`/book-ownerships?${query}`)
  }

  public createMyBook(bookOwnershipData: MyBookAttributes) {
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
    return this.create<typeof payload, MyBookContentType>(
      `/book-ownerships`,
      payload
    )
  }

  public updateMyBook(id: ID, bookOwnershipData: Partial<MyBookAttributes>) {
    const payload = {
      data: {
        startReading: bookOwnershipData.startReading,
        finishReading: bookOwnershipData.finishReading,
        rating: bookOwnershipData.rating,
        currentPage: bookOwnershipData.currentPage,
        note: bookOwnershipData.note,
        order: bookOwnershipData.order,
      },
    }
    return this.update<typeof payload, MyBookContentType>(
      `/book-ownerships/${id}`,
      payload
    )
  }

  public deleteMyBook(id: ID) {
    return this.delete<MyBookContentType>(`/book-ownerships/${id}`)
  }
}
