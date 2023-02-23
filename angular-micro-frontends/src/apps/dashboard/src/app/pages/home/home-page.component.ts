import {
  AuthorService,
  MyBookService,
  BookService,
} from '@angular-micro-frontends/book'
import {
  ImageFile,
  MyBookContentType,
} from '@angular-micro-frontends/type-definitions'
import { ViewportScroller } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {
  Observable,
  Subscription,
  combineLatest,
  filter,
  map,
  startWith,
  tap,
} from 'rxjs'

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
  template: `
    <main>
      <h1 class="flex flex-wrap gap-4 justify-between">
        <span class="text-3xl uppercase">My Books</span>
        <a routerLink="/my-book/new" uiAccentButton>Add a book to my list</a>
      </h1>

      <article id="currently-reading" class="mt-4">
        <h2 class="text-xl mb-2 capitalize">
          <span>Currently reading</span>
          <span *ngIf="currentlyReadingBooks$ | async as readingBooks">
            ({{ readingBooks.length }})
          </span>
        </h2>
        <ng-container
          *ngIf="this.currentlyReadingBooks$ | async as readingBooks"
        >
          <ul class="dark:bg-primary-700 border shadow-lg rounded-md">
            <li
              *ngFor="let readingBook of readingBooks"
              class="border-b last:border-b-0 dark:border-b-primary-500 first:rounded-t-md last:rounded-b-md"
            >
              <dashboard-my-book-list-entry
                [myBook]="readingBook"
                [highlight]="(highlightedMyBookId$ | async) === readingBook.id"
                [showProgress]="true"
              ></dashboard-my-book-list-entry>
            </li>
          </ul>
        </ng-container>
      </article>

      <article id="read-next" class="mt-4">
        <h2 class="text-xl mb-2 capitalize">
          <span>Read next</span>
          <span *ngIf="this.readNextBooks$ | async as readNextBooks">
            ({{ readNextBooks.length }})
          </span>
        </h2>
        <ng-container *ngIf="this.readNextBooks$ | async as readNextBooks">
          <ul class="dark:bg-primary-700 border shadow-lg rounded-md">
            <li
              *ngFor="let readNextBook of readNextBooks"
              class="border-b last:border-b-0 dark:border-b-primary-500 first:rounded-t-md last:rounded-b-md"
            >
              <dashboard-my-book-list-entry
                [myBook]="readNextBook"
                [highlight]="(highlightedMyBookId$ | async) === readNextBook.id"
                [showPages]="true"
              ></dashboard-my-book-list-entry>
            </li>
          </ul>
        </ng-container>
      </article>

      <article id="recently-read" class="mt-4">
        <h2 class="text-xl mb-2 capitalize">
          <span>Recently read</span>
          <span *ngIf="recentlyReadBooks$ | async as recentlyReadBooks">
            ({{ recentlyReadBooks.length }})
          </span>
        </h2>
        <ng-container
          *ngIf="this.recentlyReadBooks$ | async as recentlyReadBooks"
        >
          <ul class="dark:bg-primary-700 border shadow-lg rounded-md">
            <li
              *ngFor="let recentlyReadBook of recentlyReadBooks"
              class="border-b last:border-b-0 dark:border-b-primary-500 first:rounded-t-md last:rounded-b-md"
            >
              <dashboard-my-book-list-entry
                [myBook]="recentlyReadBook"
                [highlight]="
                  (highlightedMyBookId$ | async) === recentlyReadBook.id
                "
                [showReadDate]="true"
              ></dashboard-my-book-list-entry>
            </li>
          </ul>
        </ng-container>
      </article>

      <div class="mt-4 flex flex-col gap-2 items-center">
        <ui-loading *ngIf="isLoading$ | async"></ui-loading>
        <ui-error
          *ngIf="isError$ | async"
          text="Could not reach the server."
        ></ui-error>
      </div>
    </main>
  `,
})
export class HomePageComponent implements OnInit, OnDestroy {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly scroller: ViewportScroller,
    public readonly bookService: BookService,
    public readonly bookOwnershipService: MyBookService,
    public readonly authorService: AuthorService
  ) {
    this.scroller.setOffset([0, 100])
  }

  public currentlyReadingBooks$?: Observable<MyBookContentType[]>
  public readNextBooks$?: Observable<MyBookContentType[]>
  public recentlyReadBooks$?: Observable<MyBookContentType[]>
  public isLoading$?: Observable<boolean>
  public isSuccess$?: Observable<boolean>
  public isError$?: Observable<boolean>
  public highlightedMyBookId$?: Observable<number | null>
  private subscriptions: Subscription[] = []

  ngOnInit(): void {
    const currentlyReadingBooksQuery$ =
      this.bookOwnershipService.getMyCurrentlyReadingBooks()
    this.currentlyReadingBooks$ = currentlyReadingBooksQuery$.pipe(
      filter((query) => query.result != null && query.result.data != null),
      map((query) => query.result!.data!)
    )
    const readNextBooksQuery$ = this.bookOwnershipService.getMyUnreadBooks()
    this.readNextBooks$ = readNextBooksQuery$.pipe(
      filter((query) => query.result != null && query.result.data != null),
      map((query) => query.result!.data!)
    )
    const recentlyReadBooksQuery$ = this.bookOwnershipService.getMyReadBooks()
    this.recentlyReadBooks$ = recentlyReadBooksQuery$.pipe(
      filter((query) => query.result != null && query.result.data != null),
      map((query) => query.result!.data!)
    )
    const requests$ = combineLatest([
      currentlyReadingBooksQuery$,
      readNextBooksQuery$,
      recentlyReadBooksQuery$,
    ])
    this.isLoading$ = requests$.pipe(
      map((requests) => requests.some((request) => request.isLoading))
    )
    this.isError$ = requests$.pipe(
      map((requests) => requests.some((request) => request.error != null))
    )
    this.isSuccess$ = requests$.pipe(
      map((requests) => requests.every((request) => request.isSuccess))
    )
    this.highlightedMyBookId$ = this.route.queryParams.pipe(
      map((params) => parseInt(params['myBookId'])),
      filter((myBookId) => !isNaN(myBookId)),
      startWith(null)
    )
    this.subscriptions.push(
      this.isSuccess$
        .pipe(filter((isSuccess) => isSuccess))
        .subscribe(() => setTimeout(() => this.scrollToMyBookId(), 0))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  scrollToMyBookId(): void {
    const myBookIdParam = parseInt(this.route.snapshot.queryParams['myBookId'])
    if (!isNaN(myBookIdParam)) {
      this.scroller.scrollToAnchor(`my-book-${myBookIdParam}`)
    }
  }
}
