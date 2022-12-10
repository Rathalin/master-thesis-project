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
  tap,
  map,
} from 'rxjs'

@Component({
  selector: 'ui-input-error',
  template: `
    <div
      *ngIf="
        formGroupDirective.submitted ||
        (inputControl?.touched && (inputDebounce$ | async))
      "
      class="text-red-500 dark:text-red-400 flex flex-col"
    >
      <ng-container *ngIf="inputControl?.errors != null">
        <div *ngIf="inputControl!.errors!['required']">Input is required.</div>
        <div *ngIf="inputControl!.errors!['pattern']">Invalid input.</div>
        <div *ngIf="inputControl!.errors!['email']">Invalid email.</div>
      </ng-container>
    </div>
  `,
  styles: [],
})
export class InputErrorComponent implements OnInit, OnChanges {
  constructor(public formGroupDirective: FormGroupDirective) {}

  @Input() inputName = ''

  inputControl?: AbstractControl<string>
  inputDebounce$: Observable<boolean> = of(false)

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    const inputChanges = changes['inputName']
    if (inputChanges != null) {
      this.onInputNameChange(inputChanges.currentValue as typeof this.inputName)
    }
  }

  onInputNameChange(inputName: string) {
    console.log('onInputNameChange', inputName)
    this.inputControl = this.formGroupDirective.form?.controls[inputName]

    this.inputDebounce$ = this.inputControl.valueChanges.pipe(
      tap(() => console.log('valueChanges')),
      map(() => false),
      mergeWith(
        this.inputControl.valueChanges.pipe(
          debounceTime(500),
          map(() => true)
        )
      ),
      distinctUntilChanged(),
      tap((value) => console.log('inputDebounce$', value))
    )
  }
}
