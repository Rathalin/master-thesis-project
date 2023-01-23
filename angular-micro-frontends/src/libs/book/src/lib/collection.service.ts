import { Injectable } from '@angular/core'
import { QueryError } from 'src/libs/book/src/lib/types'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  protected readonly url = 'http://localhost:1337/api'
  protected readonly initialQueryState = {
    data: null,
    error: null,
    isLoading: false,
  } as const

  protected async query<T>(path: string, subject: BehaviorSubject<T>) {
    subject.next({
      ...subject.value,
      isLoading: true,
    })
    try {
      const response = await fetch(this.apiUrl(path))
      const data = await response.json()
      subject.next({
        ...subject.value,
        data,
        isLoading: false,
      })
    } catch (error) {
      subject.next({
        ...subject.value,
        error: error as QueryError,
        isLoading: false,
      })
    }
  }

  protected apiUrl(path: string) {
    return `${this.url}${path}`
  }
}
