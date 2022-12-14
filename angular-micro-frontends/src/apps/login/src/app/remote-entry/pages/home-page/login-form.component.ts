import { UserService } from '@angular-micro-frontends/auth'
import {
  CustomValidators,
  GroupErrorMessage,
} from '@angular-micro-frontends/ui'
import { Component, Output } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms'

@Component({
  selector: 'login-login-form',
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" autocomplete="off">
      <div class="flex flex-col gap-y-2">
        <div class="flex flex-col">
          <label for="company-id">Company ID</label>
          <input
            id="company-id"
            name="company-id"
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
            name="email"
            type="email"
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
            name="password"
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
  `,
  styles: [],
})
export class LoginFormComponent {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService
  ) {}

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
    if (this.loginForm.invalid) {
      return
    }
    const { companyId, email, password } = this.loginForm.controls
    this.userService.login(companyId.value, email.value, password.value)
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
