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
  Query,
  WithId,
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
          <div *ngIf="mode === 'create'" class="flex flex-col">
            <label for="book">Book</label>
            <select id="book" name="book" formControlName="book" uiInput>
              <ng-container
                *ngIf="
                  bookOptionsQuery != null && bookOptionsQuery.data != null
                "
              >
                <option
                  *ngFor="let book of bookOptionsQuery.data.data"
                  [ngValue]="book"
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
        <div class="mt-4 flex items-center justify-center gap-1">
          <button type="submit" uiPrimaryButton>Save</button>
        </div>
      </form>
    </ng-container>
  `,
  styles: [],
})
export class BookOwnershipFormComponent implements OnInit, OnChanges {
  @Input() bookOptionsQuery: Query<BookContentType[]> | null = null
  @Input() bookOwnershipQuery: Query<BookOwnershipContentType> | null = null
  @Input() mode: 'create' | 'update' = 'create'
  @Output() save = new EventEmitter<WithId<BookOwnershipAttributes>>()

  constructor(public readonly bookService: BookService) {}

  public readonly form = new FormGroup({
    id: new FormControl<number | null>(null),
    book: new FormControl<BookContentType | null>(null, [Validators.required]),
    startReading: new FormControl<DateString | null>(null),
    finishReading: new FormControl<DateString | null>(null),
    rating: new FormControl<BookOwnershipRating>('No Rating'),
    currentPage: new FormControl<number | null>(null),
    note: new FormControl<string | null>(null),
  })
  public ratingOptions = BookOwnershipRatingOptions

  ngOnInit(): void {
    this.form.controls.startReading.valueChanges.subscribe((value) => {
      if (value == null) {
        this.form.controls.currentPage.disable()
        this.form.controls.finishReading.disable()
      } else {
        this.form.controls.currentPage.enable()
        this.form.controls.finishReading.enable()
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bookOwnershipQuery'] != null) {
      const bookOwnershipQuery = changes['bookOwnershipQuery']
        .currentValue as typeof this.bookOwnershipQuery
      if (bookOwnershipQuery != null && bookOwnershipQuery.data != null) {
        const { book, startReading, finishReading, rating, currentPage, note } =
          bookOwnershipQuery.data.data.attributes
        const { id } = bookOwnershipQuery.data.data
        const bookOriginal = this.bookOptionsQuery?.data?.data.find(
          (b) => b.id === book.data.id
        )
        // console.log(bookOriginal)
        this.form.patchValue({
          id,
          book: bookOriginal,
          startReading,
          finishReading,
          rating,
          currentPage,
          note,
        })
        // console.log('New form state', this.form.getRawValue())
      }
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    const { id, book, startReading, finishReading, rating, currentPage, note } =
      this.form.controls
    // console.log(book)
    this.save.emit({
      id: id.value ?? -1,
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
