import { Injectable } from '@angular/core'
import axios from 'axios'
import { BehaviorSubject, map } from 'rxjs'
import { Observable } from 'rxjs'

export type LoginError = {
  key: 'invalid-credentials'
  message: string
}

type User = {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
}

type Authentication = {
  jwt: string
  user: User
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
    credentials:
      | {
          username: string
          password: string
        }
      | {
          email: string
          password: string
        }
  ): Promise<LoginError | null> {
    try {
      const response = await axios.post<Authentication>(
        'http://localhost:1337/api/auth/local',
        {
          identifier:
            'username' in credentials
              ? credentials.username
              : credentials.email,
          password: credentials.password,
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
