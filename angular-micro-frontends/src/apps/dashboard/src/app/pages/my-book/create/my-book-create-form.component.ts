import {
  BookContentType,
  MyBookAttributes,
  MyBookRating,
  MyBookRatingOptions,
  DateString,
} from '@angular-micro-frontends/type-definitions'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Observable, Subscription } from 'rxjs'

@Component({
  selector: 'dashboard-my-book-create-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="flex flex-col gap-y-2">
          <div class="flex flex-col">
            <label for="book">Book</label>
            <select id="book" name="book" formControlName="book" uiInput>
              <option
                *ngFor="let book of newBookOptions"
                class="p-2"
                [ngValue]="book"
                [selected]="book === form.controls.book.value"
              >
                {{ book | bookTitle }}
              </option>
            </select>
            <ui-input-error controlName="book"></ui-input-error>
          </div>

          <div class="flex items-center gap-2">
            <div>Book not in the list?</div>
            <a [routerLink]="['/book/new']" uiPrimaryButton>Add</a>
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
          <button type="submit" uiPrimaryButton>Add</button>
        </div>
      </form>
    </ng-container>
  `,
  styles: [],
})
export class MyBookCreateFormComponent implements OnInit, OnDestroy {
  @Input() newBookOptions: BookContentType[] = []
  @Output() create = new EventEmitter<MyBookAttributes>()

  public newBookOptions$?: Observable<BookContentType[]>

  public readonly form = new FormGroup({
    book: new FormControl<BookContentType | null>(null, [Validators.required]),
    startReading: new FormControl<DateString | null>(null),
    finishReading: new FormControl<DateString | null>(null),
    rating: new FormControl<MyBookRating>('No Rating'),
    currentPage: new FormControl<number | null>(null),
    note: new FormControl<string | null>(null),
  })
  public ratingOptions = MyBookRatingOptions
  private subscriptions: Subscription[] = []

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

  public onSubmit() {
    if (this.form.invalid) {
      return
    }
    const { book, startReading, finishReading, rating, currentPage, note } =
      this.form.controls
    this.create.emit({
      book: {
        data: {
          ...book.value!,
        },
      },
      startReading: startReading.value,
      finishReading: finishReading.value,
      rating: rating.value,
      currentPage: currentPage.value,
      note: note.value,
      order: null,
    })
  }
}
