import {
  BookOwnershipAttributes,
  BookOwnershipContentType,
  BookOwnershipRating,
  BookOwnershipRatingOptions,
  DateString,
  ID,
  WithId,
} from '@angular-micro-frontends/type-definitions'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'

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
export class MyBookUpdateFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() myBook: BookOwnershipContentType | null = null
  @Output() update = new EventEmitter<[ID, Partial<BookOwnershipAttributes>]>()

  public readonly form = new FormGroup({
    startReading: new FormControl<DateString | null>(null),
    finishReading: new FormControl<DateString | null>(null),
    rating: new FormControl<BookOwnershipRating>('No Rating'),
    currentPage: new FormControl<number | null>(null),
    note: new FormControl<string | null>(null),
  })
  public ratingOptions = BookOwnershipRatingOptions
  private subscriptions: Subscription[] = []

  ngOnChanges(changes: SimpleChanges) {
    if (changes['myBook'] != null) {
      const myBook = changes['myBook'].currentValue as typeof this.myBook
      if (myBook != null) {
        const { startReading, finishReading, rating, currentPage, note } =
          myBook.attributes
        this.form.patchValue({
          startReading,
          finishReading,
          rating,
          currentPage,
          note,
        })
      }
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.form.controls.startReading.valueChanges.subscribe((value) => {
        if (value === '') {
          this.form.controls.startReading.setValue(null)
          return
        }
        if (value == null) {
          this.form.controls.currentPage.disable()
          this.form.controls.finishReading.disable()
        } else {
          this.form.controls.currentPage.enable()
          this.form.controls.finishReading.enable()
        }
      }),
      this.form.controls.finishReading.valueChanges.subscribe((value) => {
        if (value === '') {
          this.form.controls.finishReading.setValue(null)
          return
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  onSubmit() {
    const myBook = this.myBook
    if (this.form.invalid || myBook == null) {
      return
    }
    const { startReading, finishReading, rating, currentPage, note } =
      this.form.controls
    this.update.emit([
      myBook.id,
      {
        startReading: startReading.value,
        finishReading: finishReading.value,
        rating: rating.value,
        currentPage: currentPage.value,
        note: note.value,
      },
    ])
  }
}
