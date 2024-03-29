import {
  AuthorAttributes,
  AuthorContentType,
} from '@angular-micro-frontends/type-definitions'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'

@Component({
  selector: 'dashboard-author-update-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="flex flex-col gap-y-2">
        <div class="flex flex-col">
          <label for="firstname">Firstname</label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            formControlName="firstname"
            uiInput
          />
          <ui-input-error controlName="firstname"></ui-input-error>
        </div>

        <div class="flex flex-col">
          <label for="lastname">Lastname</label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            formControlName="lastname"
            uiInput
          />
          <ui-input-error controlName="lastname"></ui-input-error>
        </div>

        <div class="flex flex-col">
          <label for="dateOfBirth">Date of birth</label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            formControlName="dateOfBirth"
            uiInput
          />
          <ui-input-error controlName="dateOfBirth"></ui-input-error>
        </div>

        <!-- <div class="flex flex-col">
            <label for="profileImage">Upload a profile image</label>
            <input
              id="profileImage"
              name="profileImage"
              type="file"
              formControlName="profileImage"
              uiInput
            />
            <ui-input-error controlName="profileImage"></ui-input-error>
          </div> -->
      </div>
      <div class="mt-4 flex items-center justify-center gap-3">
        <a routerLink="/" uiPrimaryButton>Back</a>
        <button type="submit" uiAccentButton>Update</button>
      </div>
    </form>
  `,
  styles: [],
})
export class AuthorUpdateFormComponent {
  @Input() set author(value: AuthorContentType) {
    this.form.patchValue(value.attributes)
  }
  @Output() update = new EventEmitter<Partial<AuthorAttributes>>()

  constructor(private readonly fb: FormBuilder) {}

  form = this.fb.group({
    firstname: this.fb.nonNullable.control('', [Validators.required]),
    lastname: this.fb.nonNullable.control('', [Validators.required]),
    dateOfBirth: this.fb.control<string | null>(null),
  })
  private subscriptions: Subscription[] = []

  ngOnInit() {
    this.subscriptions.push(
      this.form.controls.dateOfBirth.valueChanges.subscribe((value) => {
        if (value === '') {
          this.form.controls.dateOfBirth.setValue(null)
          return
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    const { firstname, lastname, dateOfBirth } = this.form.controls
    this.update.emit({
      firstname: firstname.value,
      lastname: lastname.value,
      dateOfBirth: dateOfBirth.value,
    })
  }
}
