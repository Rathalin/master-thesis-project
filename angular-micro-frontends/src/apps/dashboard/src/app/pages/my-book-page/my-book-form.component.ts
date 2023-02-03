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
  Result,
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
              <option
                *ngFor="let book of bookOptions"
                class="p-2"
                [ngValue]="book"
                [selected]="book === form.controls.book.value"
              >
                {{ book.attributes.title }}
              </option>
            </select>
            <ui-input-error controlName="book"></ui-input-error>
          </div>

          <div class="flex items-center gap-2">
            <div>Book not in the list?</div>
            <button type="button" uiPrimaryButton>Add</button>
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
          <button type="submit" uiPrimaryButton>
            {{ mode === 'create' ? 'Add' : 'Save' }}
          </button>
        </div>
      </form>
    </ng-container>
  `,
  styles: [],
})
export class MyBookFormComponent implements OnInit, OnChanges {
  @Input() bookOptions: BookContentType[] = []
  @Input() bookOwnership: BookOwnershipContentType | null = null
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
      const bookOwnership = changes['bookOwnershipQuery']
        .currentValue as typeof this.bookOwnership
      if (bookOwnership != null) {
        const { book, startReading, finishReading, rating, currentPage, note } =
          bookOwnership.attributes
        const { id } = bookOwnership
        const bookOriginal = this.bookOptions.find((b) => b.id === book.data.id)
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
