import { AuthService } from '@angular-micro-frontends/auth'
import { Component } from '@angular/core'

@Component({
  selector: 'login-entry',
  template: `
    <main
      class="container px-4 mx-auto flex flex-col justify-center max-w-sm mt-16"
    >
      <h1 class="mx-auto text-3xl">Login</h1>
      <login-login-form
        *ngIf="!(authService.isAuthenticated$ | async)"
      ></login-login-form>
      <div
        *ngIf="authService.isAuthenticated$ | async"
        class="flex flex-col items-center"
      >
        <div>You are now logged in.</div>
        <button type="button" (click)="onLogoutClick()" uiPrimaryButton>
          Logout
        </button>
      </div>
    </main>
  `,
  styles: [
    `
      :host {
        @apply flex-1 flex flex-col;
      }
    `,
  ],
})
export class RemoteEntryComponent {
  constructor(public readonly authService: AuthService) {}

  onLogoutClick() {
    this.authService.logout()
  }
}
