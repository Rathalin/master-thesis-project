// import { AuthMockService } from '@angular-micro-frontends/auth'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { CustomValidators } from '@angular-micro-frontends/ui'

@Component({
  selector: 'login-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="container mx-auto flex flex-col justify-center">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="flex flex-col gap-y-2">
          <div class="flex flex-col">
            <label for="student-id">Student ID</label>
            <input
              id="student-id"
              label="Student ID"
              type="email"
              autocomplete="off"
              formControlName="studentId"
              uiInput
            />
            <ui-input-error controlName="studentId"></ui-input-error>
          </div>
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
            <ui-input-error controlName="username"></ui-input-error>
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
      studentId: ['', [Validators.required, CustomValidators.studentId]],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    },
    {
      validators: [this.identifierValidator],
    }
  )
  submitted = false

  onSubmit() {
    console.log(
      this.loginForm.invalid ? 'Login form invalid' : 'Login form valid'
    )
    this.submitted = true
  }

  identifierValidator(control: AbstractControl) {
    const group = control as typeof this.loginForm
    const studentId = group.controls['studentId'].value
    const username = group.controls['username'].value

    if (studentId == null && username == null) {
      return { identifier: true }
    }

    return null
  }
}
