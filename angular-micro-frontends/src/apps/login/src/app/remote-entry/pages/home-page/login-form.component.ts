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
import { BehaviorSubject, Subscription } from 'rxjs'

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
          <div *ngIf="true" class="text-red-500 dark:text-red-400 mt-2 mx-auto">
            {{ loginError$ | async }}
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
  loginErrorSubject = new BehaviorSubject<string | null>(null)
  loginError$ = this.loginErrorSubject.asObservable()
  loginValueChangesSubscription?: Subscription

  ngOnInit(): void {
    this.loginValueChangesSubscription = this.loginForm.valueChanges.subscribe(
      () => this.loginErrorSubject.next(null)
    )
  }

  ngOnDestroy(): void {
    this.loginValueChangesSubscription?.unsubscribe()
  }

  async onSubmit() {
    this.loginErrorSubject.next(null)
    console.log(
      this.loginForm.invalid ? 'Login form invalid' : 'Login form valid'
    )
    if (this.loginForm.invalid) {
      return
    }
    const { companyId, email, password } = this.loginForm.controls

    let loginError: LoginError | null
    if (companyId.value !== '') {
      loginError = await this.userService.autheticate({
        username: companyId.value,
        password: password.value,
      })
    } else {
      loginError = await this.userService.autheticate({
        email: email.value,
        password: password.value,
      })
    }
    this.router.navigate(['/'])
    if (loginError != null) {
      if (loginError.key === 'invalid-credentials') {
        this.loginErrorSubject.next('Invalid credentials')
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
