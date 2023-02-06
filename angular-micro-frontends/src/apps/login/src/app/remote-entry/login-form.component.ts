import { AuthService } from '@angular-micro-frontends/auth'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { BehaviorSubject, Subscription } from 'rxjs'

@Component({
  selector: 'login-login-form',
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <div class="flex flex-col gap-y-2">
        <div class="flex flex-col">
          <label for="identifier">Username or Email</label>
          <input
            id="identifier"
            name="identifier"
            type="text"
            formControlName="identifier"
            uiInput
          />
          <ui-input-error controlName="identifier"></ui-input-error>
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
          <div class="mt-4">
            <ui-error
              *ngIf="loginError$ | async as error"
              [text]="error"
            ></ui-error>
          </div>
        </div>
      </div>
      <div class="mt-4 flex items-center justify-center gap-1">
        <button type="submit" uiAccentButton>Login</button>
      </div>
    </form>
  `,
  styles: [],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  readonly loginForm = this.formBuilder.nonNullable.group({
    identifier: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })
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
    if (this.loginForm.invalid) {
      return
    }
    const { identifier, password } = this.loginForm.controls

    const loginError = await this.authService.autheticate(
      identifier.value,
      password.value
    )
    this.router.navigate(['/'])
    if (loginError != null) {
      if (loginError.key === 'invalid-credentials') {
        this.loginErrorSubject.next('Invalid credentials')
      }
    }
  }
}
