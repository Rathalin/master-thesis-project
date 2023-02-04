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
      <h1 class="text-3xl mb-5 flex items-center gap-3">
        <span>Update</span>
        <span class="uppercase">
          {{ myBook.attributes.book.data.attributes.title }}
        </span>
        <button
          type="button"
          class="text-base dark:bg-red-600 dark:hover:bg-red-500"
          (click)="onDelete(myBook.id)"
          uiSecondaryButton
        >
          Delete
        </button>
      </h1>
      <dashboard-my-book-update-form
        [myBook]="myBook"
        (update)="onUpdate($event)"
      ></dashboard-my-book-update-form>
    </ng-container>
  `,
  styles: [],
})
export class MyBookUpdateComponent implements OnInit, OnChanges {
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

  onSubmit() {
    const myBook = this.myBook
    if (this.form.invalid || myBook == null) {
      return
    }
    const { startReading, finishReading, rating, currentPage, note } =
      this.form.controls
    this.update.emit({
      id: myBook.attributes.book.data.id,
      book: myBook.attributes.book,
      startReading: startReading.value,
      finishReading: finishReading.value,
      rating: rating.value,
      currentPage: currentPage.value,
      note: note.value,
      order: null,
    })
  }
}
