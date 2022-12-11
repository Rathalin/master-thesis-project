import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { AbstractControl, FormGroupDirective } from '@angular/forms'
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

        <div *ngIf="control.errors['studentId']">Invalid Student ID</div>
      </ng-container>
    </div>
    <div *ngIf="showDebug" class="uppercase">
      <div>{{ control?.touched ? 'touched' : 'untouched' }}</div>
      <div>{{ control?.dirty ? 'dirty' : 'clean' }}</div>
      <div>{{ valueChangesDebounce$ | async }}</div>
    </div>
  `,
  styles: [],
})
export class InputErrorComponent implements OnInit, OnChanges {
  constructor(public formGroupDirective: FormGroupDirective) {}

  @Input() controlName = ''
  @Input() showDebug = false

  control?: AbstractControl<string>
  valueChangesDebounceTime = 500
  valueChangesDebounce$: Observable<boolean> = of(false)

  ngOnInit(): void {}

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

    this.valueChangesDebounce$ = of(true).pipe(
      mergeWith(
        this.control.valueChanges.pipe(
          map(() => false),
          mergeWith(
            this.control.valueChanges.pipe(
              debounceTime(this.valueChangesDebounceTime),
              map(() => true)
            )
          ),
          distinctUntilChanged()
        )
      )
    )
  }
}
