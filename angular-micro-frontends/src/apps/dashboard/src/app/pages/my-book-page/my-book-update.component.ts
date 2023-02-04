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
  selector: 'dashboard-my-book-update',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>
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
    </ng-container>
  `,
  styles: [],
})
export class MyBookUpdateComponent implements OnInit, OnChanges {
  @Input() bookOptions: BookContentType[] = []
  @Input() myBook: BookOwnershipContentType | null = null
  @Output() update = new EventEmitter<WithId<BookOwnershipAttributes>>()

  constructor(public readonly bookService: BookService) {}

  public readonly form = new FormGroup({
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
    if (changes['myBook'] != null) {
      const myBook = changes['myBook'].currentValue as typeof this.myBook
      if (myBook != null) {
        const { startReading, finishReading, rating, currentPage, note } =
          myBook.attributes
        // console.log(bookOriginal)
        this.form.patchValue({
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
    const myBook = this.myBook
    if (this.form.invalid || myBook == null) {
      return
    }
    const { startReading, finishReading, rating, currentPage, note } =
      this.form.controls
    const bookOriginal = this.bookOptions.find((b) => b.id === myBook.id)!
    this.update.emit({
      id: bookOriginal.id,
      book: {
        data: bookOriginal,
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
