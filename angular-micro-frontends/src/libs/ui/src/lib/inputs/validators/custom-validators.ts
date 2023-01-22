import { AbstractControl, ValidationErrors, Validators } from '@angular/forms'

export class CustomValidators {
  static companyIdOrEmail(control: AbstractControl<string>) {
    if (control.value == null || control.value.length === 0) {
      return null
    }
    if (
      /[A-Z]{2}\d{9}/s.test(control.value) ||
      Validators.email(control) == null
    ) {
      return null
    }
    return { companyIdOrEmail: true }
  }
}
