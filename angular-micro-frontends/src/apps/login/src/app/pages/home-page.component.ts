// import { AuthMockService } from '@angular-micro-frontends/auth'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import {
  CustomValidators,
  GroupErrorMessage,
} from '@angular-micro-frontends/ui'

@Component({
  selector: 'login-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="container px-4 mx-auto flex flex-col justify-center">
      <h1 class="mx-auto text-3xl">Login</h1>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="flex flex-col gap-y-2">
          <div class="flex flex-col">
            <label for="company-id">Company ID</label>
            <input
              id="company-id"
              label="Company ID"
              type="text"
              autocomplete="off"
              formControlName="companyId"
              uiInput
            />
            <ui-input-error controlName="companyId"></ui-input-error>
            <ui-group-error [messages]="errorMessages"></ui-group-error>
          </div>
          <div class="flex flex-col">
            <label for="email">Email</label>
            <input
              id="email"
              label="Email"
              type="email"
              autocomplete="off"
              formControlName="email"
              uiInput
            />
            <ui-input-error controlName="email"></ui-input-error>
            <ui-group-error [messages]="errorMessages"></ui-group-error>
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
            <ui-input-error controlName="password"></ui-input-error>
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

  readonly loginForm = this.formBuilder.nonNullable.group(
    {
      companyId: ['', [CustomValidators.companyId]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
    },
    {
      validators: [this.loginIdentifierValidator()],
    }
  )
  readonly errorMessages: GroupErrorMessage[] = [
    {
      key: 'identifier',
      messageFn: (_errors: ValidationErrors | null) =>
        'Company ID or Email required',
    },
  ]

  onSubmit() {
    console.log(
      this.loginForm.invalid ? 'Login form invalid' : 'Login form valid'
    )
  }

  loginIdentifierValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const group = control as typeof this.loginForm
      const companyId = group.controls['companyId'].value
      const email = group.controls['email'].value

      if (companyId === '' && email === '') {
        return { identifier: true }
      }

      return null
    }
  }
}
