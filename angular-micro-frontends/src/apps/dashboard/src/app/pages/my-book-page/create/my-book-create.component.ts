import {
  BookContentType,
  BookOwnershipAttributes,
  BookOwnershipContentType,
  BookOwnershipRating,
  BookOwnershipRatingOptions,
  BookOwnershipService,
  BookService,
  DateString,
  Result,
} from '@angular-micro-frontends/book'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Observable, combineLatest, filter, map, tap } from 'rxjs'

@Component({
  selector: 'dashboard-my-book-create',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>
      <h1 class="text-3xl mb-5 flex items-center gap-3">
        <span>Add a new Book</span>
      </h1>
      <dashboard-my-book-create-form
        [newBookOptions]="(newBookOptions$ | async) ?? []"
        (create)="onCreate($event)"
      ></dashboard-my-book-create-form>
    </ng-container>
  `,
  styles: [],
})
export class MyBookCreateComponent implements OnInit {
  constructor(
    private readonly bookService: BookService,
    private readonly myBookService: BookOwnershipService
  ) {}

  public newBookOptions$?: Observable<BookContentType[]>
  public createMyBookMutation$?: Observable<Result<BookOwnershipContentType>>

  ngOnInit(): void {
    this.newBookOptions$ = combineLatest([
      this.bookService.queryBooks().pipe(
        filter((books) => books.result != null && books.result.data != null),
        map((books) => books.result!.data!)
      ),
      this.myBookService.queryBookOwnerships(),
    ]).pipe(
      filter(
        ([_books, myBookResults]) =>
          myBookResults.result != null && myBookResults.result.data != null
      ),
      map(([books, myBookResults]) => {
        const myBooks = myBookResults.result!.data!
        const myBookBookIds = myBooks.map(
          (myBook) => myBook.attributes.book.data.id
        )
        return books.filter((book) => !myBookBookIds.includes(book.id))
      }),
      tap((options) => console.log('bookOptions', options))
    )
  }

  onCreate(bookOwnership: BookOwnershipAttributes) {
    this.createMyBookMutation$ =
      this.myBookService.createBookOwnership(bookOwnership)
  }
}
