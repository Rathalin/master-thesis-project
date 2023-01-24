import {
  BookAttributes,
  BookOwnershipRating,
  BookOwnershipRatingOptions,
  DateString,
} from '@angular-micro-frontends/book'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'dashboard-book-ownership-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>
      <h1>My Book</h1>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="flex flex-col gap-y-2">
          <div class="flex flex-col">
            <label for="book">Book</label>
            <select id="book" name="book" formControlName="book" uiInput>
              <option *ngFor="let book of bookOptions" [value]="book">
                {{ book.title }}
              </option>
            </select>
            <ui-input-error controlName="book"></ui-input-error>
          </div>

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
              [disabled]="true"
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
              ß
              formControlName="finishReading"
              uiInput
            />
            <ui-input-error controlName="finishReading"></ui-input-error>
          </div>

          <div class="flex flex-col">
            <label for="rating">Rating</label>
            <select id="rating" name="rating" formControlName="rating">
              <option *ngFor="let option of ratingOptions" [value]="option">
                {{ option }}
              </option>
            </select>
            <ui-input-error controlName="rating"></ui-input-error>
          </div>
        </div>
        <div class="mt-4 flex items-center justify-center gap-1">
          <button type="submit" uiPrimaryButton>Save</button>
        </div>
      </form>
    </ng-container>
  `,
  styles: [],
})
export class BookOwnershipFormComponent {
  constructor() {}

  public readonly form = new FormGroup({
    book: new FormControl<BookAttributes | null>(null, [Validators.required]),
    startReading: new FormControl<DateString | null>(null),
    finishReading: new FormControl<DateString | null>(null),
    rating: new FormControl<BookOwnershipRating>('No Rating'),
    currentPage: new FormControl<number | null>(null),
    note: new FormControl<string | null>(null),
  })

  public bookOptions: (Partial<BookAttributes> & { id: number })[] = [
    {
      id: 1,
      title: 'The Hobbit',
    },
    {
      id: 2,
      title: 'The Lord of the Rings',
    },
    {
      id: 3,
      title: 'The Silmarillion',
    },
  ]
  public ratingOptions = BookOwnershipRatingOptions

  async onSubmit() {
    if (this.form.invalid) {
      return
    }
    const { book, startReading, finishReading, rating, currentPage, note } =
      this.form.controls
  }
}
