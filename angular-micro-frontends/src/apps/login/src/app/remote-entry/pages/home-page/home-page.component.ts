import { ChangeDetectionStrategy, Component } from '@angular/core'
import { UserService } from '@angular-micro-frontends/auth'

@Component({
  selector: 'login-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="container px-4 mx-auto flex flex-col justify-center">
      <h1 class="mx-auto text-3xl">Login</h1>
      <login-login-form
        *ngIf="!(userService.isUserLoggedIn$ | async)"
      ></login-login-form>
      <div *ngIf="userService.isUserLoggedIn$ | async">
        You are now logged in.
      </div>
    </main>
  `,
  styles: [
    `
      :host {
        @apply flex-1 flex;
      }
    `,
  ],
})
export class HomePageComponent {
  constructor(public readonly userService: UserService) {}
}
