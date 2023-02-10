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
  protected route = '/book-ownerships-of-user'

  public getMyBooks() {
    const query = qs.stringify(
      {
        populate: {
          book: {
            populate: ['authors', 'cover'],
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    )
    return this.query<MyBookContentType[]>(`${this.route}?${query}`)
  }

  public getMyBook(id: number) {
    const query = qs.stringify(
      {
        populate: {
          book: {
            populate: ['authors', 'cover'],
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    )
    return this.query<MyBookContentType>(`${this.route}/${id}?${query}`)
  }

  public getMyCurrentlyReadingBooks() {
    const query = qs.stringify(
      {
        sort: 'startReading',
        populate: {
          book: {
            populate: ['authors', 'cover'],
          },
        },
        filters: {
          $and: [
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
    return this.query<MyBookContentType[]>(`${this.route}?${query}`)
  }

  public getMyUnreadBooks() {
    const query = qs.stringify(
      {
        populate: {
          book: {
            populate: ['authors', 'cover'],
          },
        },
        filters: {
          $and: [
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
    return this.query<MyBookContentType[]>(`${this.route}?${query}`)
  }

  public getMyReadBooks() {
    const query = qs.stringify(
      {
        sort: 'finishReading:desc',
        populate: {
          book: {
            populate: ['authors', 'cover'],
          },
        },
        filters: {
          $and: [
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
    return this.query<MyBookContentType[]>(`${this.route}?${query}`)
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
      `${this.route}/${id}`,
      payload
    )
  }

  public deleteMyBook(id: ID) {
    return this.delete<MyBookContentType>(`${this.route}/${id}`)
  }
}
