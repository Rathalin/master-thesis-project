import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormGroupDirective, ValidationErrors } from '@angular/forms'

@Component({
  selector: 'ui-group-error',
  template: `
    <div
      class="text-red-500 dark:text-red-400 flex flex-col"
      *ngIf="
        formGroupDirective.submitted || (control?.touched && control?.dirty)
      "
    >
      <ng-container *ngIf="control != null && control.errors != null">
        <div *ngFor="let message of messages">
          <ng-container *ngIf="control.errors[message.key] != null">{{
            message.messageFn(control.errors[message.key])
          }}</ng-container>
        </div>
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
          {{ formGroupDirective.submitted ? 'submitted' : 'unsubmitted' }}
        </div>
      </ng-container>
    </div>
  `,
  styles: [],
})
export class GroupErrorComponent implements OnInit {
  constructor(public formGroupDirective: FormGroupDirective) {}

  @Input() messages: GroupErrorMessage[] = []
  @Input() showDebug = false

  control?: FormGroup

  ngOnInit(): void {
    this.control = this.formGroupDirective.form
  }
}

export type GroupErrorMessage = {
  key: string
  messageFn: (errors: ValidationErrors | null) => string
}
