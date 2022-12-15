import { LoginError, UserService } from '@angular-micro-frontends/auth'
import {
  CustomValidators,
  GroupErrorMessage,
} from '@angular-micro-frontends/ui'
import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'

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
          <div
            *ngIf="loginError != null"
            class="text-red-500 dark:text-red-400 mt-2 mx-auto"
          >
            {{ loginError }}
          </div>
        </div>
      </div>
      <div class="mt-4 flex items-center justify-center gap-1">
        <button type="submit" uiPrimaryButton>Login</button>
      </div>
    </form>
  `,
  styles: [],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router
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
        'Company ID or Email is required',
    },
  ]
  loginError: string | null = null
  loginValueChangesSubscription?: Subscription

  ngOnInit(): void {
    this.loginValueChangesSubscription = this.loginForm.valueChanges.subscribe(
      () => (this.loginError = null)
    )
  }

  ngOnDestroy(): void {
    this.loginValueChangesSubscription?.unsubscribe()
  }

  onSubmit() {
    this.loginError = null
    console.log(
      this.loginForm.invalid ? 'Login form invalid' : 'Login form valid'
    )
    if (this.loginForm.invalid) {
      return
    }
    const { companyId, email, password } = this.loginForm.controls
    try {
      this.userService.login(companyId.value, email.value, password.value)
      this.router.navigate(['/'])
    } catch (error) {
      const { key } = error as LoginError
      if (key === 'invalid-credentials') {
        this.loginError = 'Invalid credentials'
      }
    }
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
