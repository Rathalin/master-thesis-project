import { Injectable } from '@angular/core'
import { Result, OperationError } from 'src/libs/book/src/lib/types'
import { BehaviorSubject, Subject } from 'rxjs'
import { AuthService } from '@angular-micro-frontends/auth'

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(protected readonly authService: AuthService) {}

  protected readonly url = 'http://localhost:1337/api'

  protected query<T>(path: string) {
    const query = new BehaviorSubject<Result<T>>({
      result: null,
      error: null,
      isLoading: true,
    })
    fetch(this.apiUrl(path))
      .then((response) => response.json())
      .then((data) =>
        query.next({
          result: data,
          error: null,
          isLoading: false,
        })
      )
      .catch((error) =>
        query.next({
          ...query.value,
          error,
          isLoading: false,
        })
      )
    return query.asObservable()
  }

  protected create<TPayload extends object, TResult>(
    path: string,
    payload?: TPayload
  ) {
    const mutation = new BehaviorSubject<Result<TResult>>({
      result: null,
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
          result,
          error: null,
          isLoading: false,
        })
      )
      .catch((error) =>
        mutation.next({
          ...mutation.value,
          error,
          isLoading: false,
        })
      )
    return mutation.asObservable()
  }

  protected update<TPayload extends object, TResult>(
    path: string,
    payload?: TPayload
  ) {
    const mutation = new BehaviorSubject<Result<TResult>>({
      result: null,
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
          result,
          error: null,
          isLoading: false,
        })
      )
      .catch((error) =>
        mutation.next({
          ...mutation.value,
          error,
          isLoading: false,
        })
      )
    return mutation.asObservable()
  }

  protected delete<TResult>(path: string) {
    const mutation = new BehaviorSubject<Result<TResult>>({
      result: null,
      error: null,
      isLoading: true,
    })
    fetch(this.apiUrl(path), {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((result) =>
        mutation.next({
          result,
          error: null,
          isLoading: true,
        })
      )
      .catch((error) =>
        mutation.next({
          ...mutation.value,
          error,
          isLoading: true,
        })
      )
    return mutation.asObservable()
  }

  protected apiUrl(path: string) {
    return `${this.url}${path}`
  }
}
