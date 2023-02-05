import { Injectable } from '@angular/core'
import axios, { AxiosResponse } from 'axios'
import { BehaviorSubject, map } from 'rxjs'

export type LoginError = {
  key: 'invalid-credentials'
  message: string
}

type DateString = string

export type Authentication = {
  jwt: string
  user: User
}

export type User = {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: DateString
  updatedAt: DateString
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSubject = new BehaviorSubject<Authentication | null>(null)
  auth$ = this.authSubject.asObservable()
  isAuthenticated$ = this.auth$.pipe(map((auth) => auth != null))
  private readonly localStorageTokenKey = 'auth'
  private readonly localStorageUserKey = 'user'

  constructor() {
    this.loadFromLocalStorage()
  }

  get isAuthenticated() {
    return this.authSubject.value != null
  }

  get currentUser() {
    return this.authSubject.value?.user ?? null
  }

  private currentUserSubject = new BehaviorSubject<User | null>(null)
  public currentUser$ = this.currentUserSubject.asObservable()

  public queryCurrentUser() {
    axios.get<User>('http://localhost:1337/api/users/me').then((response) => {
      this.currentUserSubject.next(response.data)
    })
    return this.currentUser$
  }

  public invalidateCurrentUserCache() {
    this.queryCurrentUser()
  }

  public setCurrentUserData(userData: User) {
    this.currentUserSubject.next(userData)
  }

  async autheticate(
    identifier: string,
    password: string
  ): Promise<LoginError | null> {
    try {
      const response = await axios.post<Authentication>(
        'http://localhost:1337/api/auth/local',
        {
          identifier,
          password,
        }
      )
      this.authSubject.next(response.data)
      this.currentUserSubject.next(response.data.user)
      this.saveToLocalStorage(response.data)
    } catch (_error) {
      return {
        key: 'invalid-credentials',
        message: 'Invalid credentials',
      }
    }
    return null
  }

  logout() {
    this.authSubject.next(null)
  }

  private loadFromLocalStorage() {
    const cachedToken = localStorage.getItem(this.localStorageTokenKey)
    const cachedUser = localStorage.getItem(this.localStorageUserKey)
    if (cachedToken != null && cachedUser != null) {
      this.authSubject.next({
        jwt: cachedToken,
        user: JSON.parse(cachedUser),
      })
    }
    console.log('Loading AUTH', this.authSubject.value)
  }

  private saveToLocalStorage(auth: Authentication) {
    localStorage.setItem(this.localStorageTokenKey, auth.jwt)
    localStorage.setItem(this.localStorageUserKey, JSON.stringify(auth.user))
    console.log('Saving AUTH', this.authSubject.value)
  }
}
