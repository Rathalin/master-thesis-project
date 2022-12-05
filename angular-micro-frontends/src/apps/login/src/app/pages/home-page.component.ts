import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'login-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="container mx-auto flex flex-col justify-center">
      <form action="">
        <div class="flex flex-col gap-y-3">
          <input id="username" label="Username" autocomplete="off" uiInput />
          <input id="password" label="Password" type="password" uiInput />
        </div>
        <div class="mt-4 flex gap-1">
          <button type="button" uiSecondaryButton>Test</button>
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
export class HomePageComponent {}
