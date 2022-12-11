import { AbstractControl, ValidationErrors } from '@angular/forms'

export class CustomValidators {
  static studentId(control: AbstractControl<string>): ValidationErrors | null {
    if (control.value == null || control.value.length === 0) {
      return null
    }
    if (/[Ss]\d{10}$/s.test(control.value)) {
      return null
    }
    return { studentId: true }
  }
}
