// import { AuthMockService } from '@angular-micro-frontends/auth'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'login-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="container mx-auto flex flex-col justify-center">
      <form action="">
        <div class="flex flex-col gap-y-3">
          <div class="flex flex-col">
            <label for="username">Username</label>
            <input id="username" label="Username" autocomplete="off" uiInput />
          </div>
          <div class="flex flex-col">
            <label for="password">Password</label>
            <input id="password" label="Password" type="password" uiInput />
          </div>
        </div>
        <div class="mt-4 flex gap-1">
          <button type="button" uiPrimaryButton>Login</button>
        </div>
      </form>
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
  // constructor(public authService: AuthMockService) {}
  // onLoginClick() {
  //   this.authService.login()
  // }
}
