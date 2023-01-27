import { Injectable } from '@angular/core'
import { QueryError } from 'src/libs/book/src/lib/types'
import { BehaviorSubject } from 'rxjs'
import { AuthService } from '@angular-micro-frontends/auth'

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(protected readonly authService: AuthService) {}

  protected readonly url = 'http://localhost:1337/api'
  protected readonly initialQueryState = {
    data: null,
    error: null,
    isLoading: false,
  } as const
  protected readonly initialMutateState = this.initialQueryState

  protected async query<T>(path: string, subject: BehaviorSubject<T>) {
    subject.next({
      ...subject.value,
      error: null,
      isLoading: true,
    })
    try {
      const response = await fetch(this.apiUrl(path))
      const data = await response.json()
      subject.next({
        ...subject.value,
        data,
        error: null,
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

  protected async create<TSubject, TData extends object>(
    path: string,
    data: TData,
    subject: BehaviorSubject<TSubject>
  ) {
    subject.next({
      ...subject.value,
      error: null,
      isLoading: true,
    })
    try {
      const response = await fetch(this.apiUrl(path), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      })
      const responseData = await response.json()
      console.log(path)
      console.log(responseData)
      subject.next({
        ...subject.value,
        responseData,
        error: null,
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

  protected async update<TSubject, TData extends object>(
    path: string,
    data: TData,
    subject: BehaviorSubject<TSubject>
  ) {
    subject.next({
      ...subject.value,
      error: null,
      isLoading: true,
    })
    try {
      const response = await fetch(this.apiUrl(path), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      })
      const responseData = await response.json()
      console.log(path)
      console.log(responseData)
      subject.next({
        ...subject.value,
        responseData,
        error: null,
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
