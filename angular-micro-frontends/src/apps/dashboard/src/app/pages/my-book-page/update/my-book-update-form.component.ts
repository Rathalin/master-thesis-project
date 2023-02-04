import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'dashboard-my-book-update-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="flex flex-col gap-y-2">
        <div class="flex flex-col">
          <label for="startReading">Started Reading</label>
          <input
            id="startReading"
            name="startReading"
            type="date"
            formControlName="startReading"
            uiInput
          />
          <ui-input-error controlName="startReading"></ui-input-error>
        </div>

        <div class="flex flex-col">
          <label for="currentPage">Current Page</label>
          <input
            id="currentPage"
            name="currentPage"
            type="number"
            formControlName="currentPage"
            [min]="1"
            class="dark:bg-slate-700 disabled:hover:bg-slate-700 disabled:hover:outline-none"
            uiInput
          />
          <ui-input-error controlName="currentPage"></ui-input-error>
        </div>

        <div class="flex flex-col">
          <label for="finishReading">Finished Reading</label>
          <input
            id="finishReading"
            name="finishReading"
            type="date"
            formControlName="finishReading"
            uiInput
          />
          <ui-input-error controlName="finishReading"></ui-input-error>
        </div>

        <div class="flex flex-col">
          <label for="rating">Rating</label>
          <select id="rating" name="rating" formControlName="rating" uiInput>
            <option *ngFor="let option of ratingOptions" [ngValue]="option">
              {{ option }}
            </option>
          </select>
          <ui-input-error controlName="rating"></ui-input-error>
        </div>

        <div class="flex flex-col">
          <label for="note">Note</label>
          <textarea
            id="note"
            name="note"
            type="text"
            formControlName="note"
            uiInput
          ></textarea>
          <ui-input-error controlName="note"></ui-input-error>
        </div>
      </div>
      <div class="mt-4 flex items-center justify-center gap-3">
        <a routerLink="/" uiSecondaryButton>Back</a>
        <button type="submit" uiPrimaryButton>Update</button>
      </div>
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBookUpdateFormComponent {}
