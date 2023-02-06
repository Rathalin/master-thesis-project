import {
  BookOwnershipService,
  BookService,
} from '@angular-micro-frontends/book'
import {
  BookContentType,
  BookOwnershipAttributes,
  BookOwnershipContentType,
  RequestState,
} from '@angular-micro-frontends/type-definitions'
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { Router } from '@angular/router'
import { Observable, Subscription, combineLatest, filter, map, tap } from 'rxjs'

@Component({
  selector: 'dashboard-my-book-create-page',
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

      <ui-request-state
        [state]="createMyBookMutation$ | async"
        errorText="Could not add your new book"
      ></ui-request-state>
    </ng-container>
  `,
  styles: [],
})
export class MyBookCreatePageComponent implements OnInit, OnDestroy {
  constructor(
    private readonly router: Router,
    private readonly bookService: BookService,
    private readonly myBookService: BookOwnershipService
  ) {}

  public newBookOptions$?: Observable<BookContentType[]>
  public createMyBookMutation$?: Observable<
    RequestState<BookOwnershipContentType>
  >
  private createMyBookMutationSubscription$?: Subscription

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
      })
    )
  }

  ngOnDestroy(): void {
    this.createMyBookMutationSubscription$?.unsubscribe()
  }

  onCreate(bookOwnership: BookOwnershipAttributes) {
    this.createMyBookMutation$ =
      this.myBookService.createBookOwnership(bookOwnership)
    this.createMyBookMutationSubscription$ =
      this.createMyBookMutation$.subscribe(() => this.router.navigate(['/']))
  }
}
