import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

type User = {
  username: string
  email: string
  password: string
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly serverData = {
    users: [
      {
        username: 'IT420691337',
        email: 'daniel@company.at',
        password: 'asdf123',
      },
    ] as User[],
  }

  private isUserLoggedInSubject = new BehaviorSubject(false)
  isUserLoggedIn$ = this.isUserLoggedInSubject.asObservable()

  get isUserLoggedIn() {
    return this.isUserLoggedInSubject.value
  }

  login(username: string, email: string, password: string) {
    const { users } = this.serverData
    if (
      users.some(
        (user) =>
          (user.username === username || user.email === email) &&
          user.password === password
      )
    ) {
      this.isUserLoggedInSubject.next(true)
    }
  }

  logout() {
    this.isUserLoggedInSubject.next(false)
  }
}
