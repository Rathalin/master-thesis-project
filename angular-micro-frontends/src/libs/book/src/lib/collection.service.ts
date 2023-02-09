import { Injectable } from '@angular/core'
import {
  RequestState,
  WithMeta,
} from '@angular-micro-frontends/type-definitions'
import { BehaviorSubject } from 'rxjs'
import { AuthService } from '@angular-micro-frontends/auth'

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(protected readonly authService: AuthService) {}

  protected readonly url = 'http://localhost:1337/api'

  protected query<T>(path: string) {
    const query = this.createRequestState<T>()
    fetch(this.apiUrl(path), {
      headers: {
        Authorization: this.getBaererToken(),
      },
    })
      .then((response) => response.json())
      .then((data) => this.onSuccess(query, data))
      .catch((error) => this.onError(query, error))
    return query.asObservable()
  }

  protected create<TPayload extends object, TResult>(
    path: string,
    payload?: TPayload
  ) {
    const mutation = this.createRequestState<TResult>()
    fetch(this.apiUrl(path), {
      method: 'POST',
      headers: {
        Authorization: this.getBaererToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((result) => this.onSuccess(mutation, result))
      .catch((error) => this.onError(mutation, error))
      .finally(() => mutation.complete())
    return mutation.asObservable()
  }

  protected update<TPayload extends object, TResult>(
    path: string,
    payload?: TPayload
  ) {
    const mutation = this.createRequestState<TResult>()
    fetch(this.apiUrl(path), {
      method: 'PUT',
      headers: {
        Authorization: this.getBaererToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((result) => this.onSuccess(mutation, result))
      .catch((error) => this.onError(mutation, error))
      .finally(() => mutation.complete())
    return mutation.asObservable()
  }

  protected delete<TResult>(path: string) {
    const mutation = this.createRequestState<TResult>()
    fetch(this.apiUrl(path), {
      method: 'DELETE',
      headers: {
        Authorization: this.getBaererToken(),
      },
    })
      .then((response) => response.json())
      .then((result) => this.onSuccess(mutation, result))
      .catch((error) => this.onError(mutation, error))
      .finally(() => mutation.complete())
    return mutation.asObservable()
  }

  protected apiUrl(path: string) {
    return `${this.url}${path}`
  }

  protected getBaererToken() {
    return `Bearer ${this.authService.token}`
  }

  private createRequestState<T>(): BehaviorSubject<RequestState<T>> {
    return new BehaviorSubject<RequestState<T>>({
      result: null,
      error: null,
      isLoading: true,
      isSuccess: false,
      isError: false,
    })
  }

  private onSuccess<
    TSubject extends BehaviorSubject<RequestState<any>>,
    TData extends WithMeta<any>
  >(subject: TSubject, result: TData) {
    subject.next({
      result,
      error: null,
      isLoading: false,
      isSuccess: true,
      isError: false,
    })
  }

  private onError<TSubject extends BehaviorSubject<RequestState<any>>, TError>(
    subject: TSubject,
    error: TError
  ) {
    subject.next({
      ...subject.value,
      error,
      isLoading: false,
      isSuccess: false,
      isError: true,
    })
  }
}
