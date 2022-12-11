import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms'
import {
  debounceTime,
  distinctUntilChanged,
  mergeWith,
  Observable,
  of,
  startWith,
  map,
} from 'rxjs'

@Component({
  selector: 'ui-input-error',
  template: `
    <div
      *ngIf="
        formGroupDirective.submitted ||
        (control?.touched && control?.dirty && (valueChangesDebounce$ | async))
      "
      class="text-red-500 dark:text-red-400 flex flex-col"
    >
      <ng-container *ngIf="control != null && control.errors != null">
        <div *ngIf="control.errors['required']">Input is required</div>
        <div *ngIf="control.errors['pattern']">Invalid input</div>
        <div *ngIf="control.errors['email']">Invalid email</div>

        <div *ngIf="control.errors['companyId']">Invalid Company ID</div>
      </ng-container>
    </div>

    <div *ngIf="showDebug" class="text-sm mt-1 dark:text-purple-400 flex gap-1">
      <ng-container *ngIf="control != null">
        <div class="dark:bg-purple-600 dark:text-white rounded-md px-1">
          {{
            control.valid ? 'valid' : control.invalid ? 'invalid' : 'disabled'
          }}
        </div>
        <div class="dark:bg-purple-600 dark:text-white rounded-md px-1">
          {{ control.touched ? 'touched' : 'untouched' }}
        </div>
        <div class="dark:bg-purple-600 dark:text-white rounded-md px-1">
          {{ control.dirty ? 'dirty' : 'clean' }}
        </div>
        <div class="dark:bg-purple-600 dark:text-white rounded-md px-1">
          {{ (valueChangesDebounce$ | async) ? 'debounced' : 'debouncing' }}
        </div>
        <div class="dark:bg-purple-600 dark:text-white rounded-md px-1">
          {{ formGroupDirective.submitted ? 'submitted' : 'unsubmitted' }}
        </div>
      </ng-container>
      <div
        *ngIf="control == null"
        class="dark:bg-purple-600 dark:text-white rounded-md px-1"
      >
        Control not found
      </div>
    </div>
  `,
  styles: [],
})
export class InputErrorComponent implements OnChanges {
  constructor(public formGroupDirective: FormGroupDirective) {}

  @Input() controlName = ''
  @Input() showDebug = false

  control?: AbstractControl<string>
  valueChangesDebounceTime = 500
  valueChangesDebounce$: Observable<boolean> = of(true)

  ngOnChanges(changes: SimpleChanges) {
    const controlChanges = changes['controlName']
    if (controlChanges != null) {
      this.onControlNameChange(
        controlChanges.currentValue as typeof this.controlName
      )
    }
  }

  onControlNameChange(controlName: string) {
    this.control = this.formGroupDirective.form?.controls[controlName]
    if (this.control == null) {
      throw new Error(`No input with name '${controlName}' found.`)
    }

    // this.valueChangesDebounce$ = of(true).pipe(
    //   mergeWith(
    //     this.control.valueChanges.pipe(
    //       map(() => false),
    //       mergeWith(
    //         this.control.valueChanges.pipe(
    //           debounceTime(this.valueChangesDebounceTime),
    //           map(() => true)
    //         )
    //       ),
    //       distinctUntilChanged()
    //     )
    //   )
    // )
  }
}
