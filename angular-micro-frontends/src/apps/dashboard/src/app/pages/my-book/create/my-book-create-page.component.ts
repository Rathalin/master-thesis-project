import { MyBookService, BookService } from '@angular-micro-frontends/book'
import {
  BookContentType,
  MyBookAttributes,
  MyBookContentType,
  RequestState,
} from '@angular-micro-frontends/type-definitions'
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription, combineLatest, filter, map, tap } from 'rxjs'

@Component({
  selector: 'dashboard-my-book-create-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>
      <h1 class="text-3xl mb-5 flex items-center gap-3 flex-wrap">
        <span>Add a new Book</span>
      </h1>
      <dashboard-my-book-create-form
        [newBookOptions]="(newBookOptions$ | async) ?? []"
        (create)="onCreate($event)"
      ></dashboard-my-book-create-form>

      <ui-request-state
        [state]="createMyBookRequest$ | async"
        errorText="Could not add your new book"
      ></ui-request-state>
    </ng-container>
  `,
  styles: [],
})
export class MyBookCreatePageComponent implements OnInit, OnDestroy {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly bookService: BookService,
    private readonly myBookService: MyBookService
  ) {}

  public newBookOptions$?: Observable<BookContentType[]>
  public createMyBookRequest$?: Observable<RequestState<MyBookContentType>>
  private subscriptons: Subscription[] = []

  ngOnInit(): void {
    this.newBookOptions$ = combineLatest([
      this.bookService.queryBooks().pipe(
        filter((books) => books.result != null && books.result.data != null),
        map((books) => books.result!.data!)
      ),
      this.myBookService.getMyBooks(),
    ]).pipe(
      filter(
        ([_books, myBookRequest]) =>
          myBookRequest.result != null && myBookRequest.result.data != null
      ),
      map(([books, myBookRequest]) => {
        const myBooks = myBookRequest.result!.data!
        const myBookBookIds = myBooks.map(
          (myBook) => myBook.attributes.book.data.id
        )
        return books.filter((book) => !myBookBookIds.includes(book.id))
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptons.forEach((subscription) => subscription.unsubscribe())
  }

  onCreate(bookOwnership: MyBookAttributes) {
    this.createMyBookRequest$ = this.myBookService.createMyBook(bookOwnership)
    this.subscriptons.push(
      this.createMyBookRequest$
        .pipe(
          filter((request) => request.isSuccess),
          map((request) => request.result!.data!.id)
        )
        .subscribe((id) => this.navigateBackWithId(id))
    )
  }

  navigateBackWithId(id: number) {
    this.router.navigate(['/'], {
      queryParams: {
        myBookId: id,
      },
    })
  }
}
