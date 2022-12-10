import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import {
  AbstractControl,
  FormControlStatus,
  FormGroupDirective,
} from '@angular/forms'
import {
  debounceTime,
  distinctUntilChanged,
  mergeWith,
  Observable,
  of,
  Subject,
  tap,
  map,
} from 'rxjs'

@Component({
  selector: 'ui-input-error',
  template: `
    <ng-container>
      <div
        *ngIf="
          submitted ||
          (inputControl?.errors != null &&
            inputControl?.touched &&
            (inputDebounce$ | async))
        "
        class="text-red-500 dark:text-red-400 flex flex-col"
      >
        <div *ngIf="inputControl!.errors!['required']">Input is required.</div>
        <div *ngIf="inputControl!.errors!['pattern']">Invalid input.</div>
        <div *ngIf="inputControl!.errors!['email']">Invalid email.</div>
      </div>
    </ng-container>
  `,
  styles: [],
})
export class InputErrorComponent implements OnChanges {
  constructor(public formGroupDirective: FormGroupDirective) {}

  @Input() inputName = ''
  @Input() statusChanges: Observable<FormControlStatus> = new Observable()
  @Input() submitted = false

  inputControl?: AbstractControl
  inputDebounce$: Observable<boolean> = of(false)

  ngOnChanges(changes: SimpleChanges) {
    const inputChanges = changes['inputName']
    if (inputChanges != null) {
      const inputName = inputChanges.currentValue as typeof this.inputName
      this.inputControl =
        this.formGroupDirective.form?.controls[inputChanges.currentValue]
    }

    const statusChangesChanges = changes['statusChanges']
    if (statusChangesChanges != null) {
      const statusChanges =
        statusChangesChanges.currentValue as typeof this.statusChanges
      console.log(statusChangesChanges.currentValue)

      this.inputDebounce$ = statusChanges.pipe(
        map(() => false),
        mergeWith(
          statusChanges.pipe(
            debounceTime(500),
            map(() => true)
          )
        ),
        tap((val) => console.log(val))
      )
    }
  }
}
