import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { debounceTime, distinctUntilChanged, Subject, tap } from 'rxjs'

@Component({
  selector: 'login-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="container mx-auto flex flex-col justify-center">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="flex flex-col gap-y-3">
          <div class="flex flex-col">
            <label for="username">Username</label>
            <input
              id="username"
              label="Username"
              type="email"
              autocomplete="off"
              formControlName="username"
              uiInput
            />
            <ui-input-error
              inputName="username"
              [submitted]="submitted"
            ></ui-input-error>
          </div>
          <div class="flex flex-col">
            <label for="password">Password</label>
            <input
              id="password"
              label="Password"
              type="password"
              formControlName="password"
              uiInput
            />
            <ui-input-error
              inputName="password"
              [statusChanges]="loginForm.controls.password.statusChanges"
              [submitted]="submitted"
            ></ui-input-error>
          </div>
        </div>
        <div class="mt-4 flex gap-1">
          <button type="submit" uiPrimaryButton>Login</button>
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
  constructor(private readonly formBuilder: FormBuilder) {}

  readonly loginForm = this.formBuilder.nonNullable.group({
    username: ['test', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })
  submitted = false

  onSubmit() {
    console.log(
      this.loginForm.invalid ? 'Login form invalid' : 'Login form valid'
    )
    this.submitted = true
  }
}
