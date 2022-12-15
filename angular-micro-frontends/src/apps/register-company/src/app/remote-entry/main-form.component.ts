import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'register-company-main-form',
  template: `
    <form [formGroup]="companyForm" autocomplete="off">
      <article class="mt-4">
        <div class="flex gap-4">
          <div class="flex flex-col w-1/2">
            <label for="company-id">Company name</label>
            <input
              id="company-name"
              name="company-name"
              type="text"
              autocomplete="off"
              formControlName="name"
              uiInput
            />
            <ui-input-error controlName="name"></ui-input-error>
          </div>
        </div>
      </article>
      <article class="mt-4">
        <div class="flex gap-4">
          <div class="flex flex-col w-1/2">
            <label for="uid">UID</label>
            <input
              id="uid"
              name="uid"
              type="text"
              autocomplete="off"
              formControlName="uid"
              uiInput
            />
            <ui-input-error controlName="uid"></ui-input-error>
          </div>
          <div class="flex flex-col w-1/2">
            <label for="tax-id">Tax ID</label>
            <input
              id="tax-id"
              name="tax-id"
              type="text"
              autocomplete="off"
              formControlName="taxId"
              uiInput
            />
            <ui-input-error controlName="taxId"></ui-input-error>
          </div>
        </div>
      </article>
      <article class="mt-4">
        <h2 class="text-xl">Address</h2>
        <div class="flex gap-4">
          <div class="flex flex-col w-1/2">
            <label for="street">Street</label>
            <input
              id="street"
              name="street"
              type="text"
              autocomplete="off"
              formControlName="street"
              uiInput
            />
            <ui-input-error controlName="street"></ui-input-error>
          </div>
          <div class="flex flex-col w-1/2">
            <label for="house-number">House number</label>
            <input
              id="house-number"
              name="house-number"
              type="text"
              autocomplete="off"
              formControlName="houseNumber"
              uiInput
            />
            <ui-input-error controlName="houseNumber"></ui-input-error>
          </div>
        </div>
        <div class="flex gap-4">
          <div class="flex flex-col w-1/2">
            <label for="zip">Zip code</label>
            <input
              id="zip"
              name="zip"
              type="text"
              autocomplete="off"
              formControlName="zip"
              uiInput
            />
            <ui-input-error controlName="zip"></ui-input-error>
          </div>
          <div class="flex flex-col w-1/2">
            <label for="country">Country</label>
            <input
              id="country"
              name="country"
              type="text"
              autocomplete="off"
              formControlName="country"
              uiInput
            />
            <ui-input-error controlName="country"></ui-input-error>
          </div>
        </div>
      </article>
      <div class="mt-6 flex items-center gap-1">
        <button type="submit" uiPrimaryButton>Register</button>
      </div>
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainFormComponent {
  constructor(private readonly formBuilder: FormBuilder) {}

  readonly companyForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    street: ['', [Validators.required]],
    houseNumber: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    country: ['', [Validators.required]],
    uid: ['', [Validators.required]],
    taxId: ['', [Validators.required]],
  })
}
