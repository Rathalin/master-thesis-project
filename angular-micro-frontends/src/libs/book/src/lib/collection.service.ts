import { Injectable } from '@angular/core'
import { Mutation, Query, QueryError } from 'src/libs/book/src/lib/types'
import { BehaviorSubject, Subject } from 'rxjs'
import { AuthService } from '@angular-micro-frontends/auth'

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(protected readonly authService: AuthService) {}

  protected readonly url = 'http://localhost:1337/api'

  protected query<T>(path: string) {
    const query = new BehaviorSubject<Query<T>>({
      data: null,
      error: null,
      isLoading: true,
    })
    fetch(this.apiUrl(path))
      .then((response) => response.json())
      .then((data) =>
        query.next({
          ...query.value,
          data,
          error: null,
          isLoading: false,
        })
      )
      .catch((error) =>
        query.next({
          ...query.value,
          error: error as QueryError,
          isLoading: false,
        })
      )
    return query.asObservable()
  }

  protected create<TResult, TPayload extends object>(
    path: string,
    payload?: TPayload
  ) {
    const mutation = new BehaviorSubject<Mutation<TResult>>({
      data: null,
      error: null,
      isLoading: true,
    })
    fetch(this.apiUrl(path), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload }),
    })
      .then((response) => response.json())
      .then((result) =>
        mutation.next({
          ...mutation.value,
          data: result,
          error: null,
          isLoading: false,
        })
      )
      .catch((error) =>
        mutation.next({
          ...mutation.value,
          error: error as QueryError,
          isLoading: false,
        })
      )
    return mutation.asObservable()
  }

  protected update<TResult, TPayload extends object>(
    path: string,
    payload?: TPayload
  ) {
    const mutation = new BehaviorSubject<Mutation<TResult>>({
      data: null,
      error: null,
      isLoading: true,
    })
    fetch(this.apiUrl(path), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload }),
    })
      .then((response) => response.json())
      .then((result) =>
        mutation.next({
          ...mutation.value,
          data: result,
          error: null,
          isLoading: false,
        })
      )
      .catch((error) =>
        mutation.next({
          ...mutation.value,
          error: error as QueryError,
          isLoading: false,
        })
      )
    return mutation.asObservable()
  }

  protected apiUrl(path: string) {
    return `${this.url}${path}`
  }
}
