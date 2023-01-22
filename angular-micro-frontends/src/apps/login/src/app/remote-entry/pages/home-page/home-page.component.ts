import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AuthService } from '@angular-micro-frontends/auth'

@Component({
  selector: 'login-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
        @apply flex-1 flex;
      }
    `,
  ],
})
export class HomePageComponent {
  constructor(public readonly authService: AuthService) {}

  onLogoutClick() {
    this.authService.logout()
  }
}
