import {
  BookAttributes,
  BookContentType,
  BookOwnershipAttributes,
  BookOwnershipContentType,
  BookOwnershipRating,
  BookOwnershipRatingOptions,
  BookService,
  ContentType,
  DateString,
  QueryMany,
  QueryOne,
} from '@angular-micro-frontends/book'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { BehaviorSubject, Observable, map } from 'rxjs'

@Component({
  selector: 'dashboard-book-ownership-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="flex flex-col gap-y-2">
          <div class="flex flex-col">
            <label for="book">Book</label>
            <select id="book" name="book" formControlName="book" uiInput>
              <ng-container
                *ngIf="
                  bookOptionsQuery != null && bookOptionsQuery.data != null
                "
              >
                <option
                  *ngFor="let book of bookOptionsQuery.data.data"
                  [value]="book"
                  [selected]="book === form.controls.book.value"
                >
                  {{ book.attributes.title }}
                </option>
              </ng-container>
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
              [readOnly]="
                (form.controls.startReading.valueChanges | async) == null
              "
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
            <select id="rating" name="rating" formControlName="rating" uiInput>
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
export class BookOwnershipFormComponent implements OnChanges {
  @Input() bookOptionsQuery: QueryMany<BookContentType> | null = null
  @Input() bookOwnershipQuery: QueryOne<BookOwnershipContentType> | null = null
  @Output() submit = new EventEmitter<BookOwnershipAttributes>()

  constructor(public readonly bookService: BookService) {}

  public readonly form = new FormGroup({
    book: new FormControl<BookContentType | null>(null, [Validators.required]),
    startReading: new FormControl<DateString | null>(null),
    finishReading: new FormControl<DateString | null>(null),
    rating: new FormControl<BookOwnershipRating>('No Rating'),
    currentPage: new FormControl<number | null>(null),
    note: new FormControl<string | null>(null),
  })
  public ratingOptions = BookOwnershipRatingOptions

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bookOwnershipQuery'] != null) {
      const bookOwnershipQuery = changes['bookOwnershipQuery']
        .currentValue as typeof this.bookOwnershipQuery
      if (bookOwnershipQuery != null && bookOwnershipQuery.data != null) {
        const { book, startReading, finishReading, rating, currentPage, note } =
          bookOwnershipQuery.data.data.attributes
        console.log(
          this.bookOptionsQuery?.data?.data.find((b) => b.id === book.data.id)
        )
        this.form.patchValue({
          book: this.bookOptionsQuery?.data?.data.find(
            (b) => b.id === book.data.id
          ),
          startReading,
          finishReading,
          rating,
          currentPage,
          note,
        })
        console.log('New form state', this.form.getRawValue())
      }
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    const { book, startReading, finishReading, rating, currentPage, note } =
      this.form.controls
    this.submit.emit({
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
