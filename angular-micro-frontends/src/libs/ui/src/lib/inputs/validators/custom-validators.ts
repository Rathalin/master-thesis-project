import { AbstractControl, ValidationErrors } from '@angular/forms'

export class CustomValidators {
  static companyId(control: AbstractControl<string>): ValidationErrors | null {
    if (control.value == null || control.value.length === 0) {
      return null
    }
    if (/[A-Z]{2}\d{9}/s.test(control.value)) {
      return null
    }
    return { companyId: true }
  }
}
