import { Injectable } from '@angular/core'
import axios from 'axios'
import { BehaviorSubject, map } from 'rxjs'

export type LoginError = {
  key: 'invalid-credentials'
  message: string
}

type DateString = string

export type Authentication = {
  jwt: string
  user: {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: DateString
    updatedAt: DateString
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSubject = new BehaviorSubject<Authentication | null>(null)
  auth$ = this.authSubject.asObservable()
  isAuthenticated$ = this.auth$.pipe(map((auth) => auth != null))

  get isAuthenticated() {
    return this.authSubject.value != null
  }

  get currentUser() {
    return this.authSubject.value?.user ?? null
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
      console.log(response.data)
      this.authSubject.next(response.data)
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
}
