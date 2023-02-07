import {
  AuthorService,
  MyBookService,
  BookService,
} from '@angular-micro-frontends/book'
import {
  ImageFile,
  MyBookContentType,
} from '@angular-micro-frontends/type-definitions'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Observable, combineLatest, filter, map } from 'rxjs'

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
  template: `
    <main>
      <h1 class="mb-4 flex flex-wrap gap-4 justify-between">
        <span class="text-3xl uppercase">My Books</span>
        <a routerLink="/my-book/new" uiAccentButton>Add a book to my list</a>
      </h1>

      <article id="currently-reading" class="mb-4">
        <h2 class="text-xl mb-2 capitalize">Currently reading</h2>
        <ng-container
          *ngIf="this.currentlyReadingBooks$ | async as readingBooks"
        >
          <ul class="dark:bg-primary-700 border shadow-lg rounded-md">
            <li
              *ngFor="let readingBook of readingBooks"
              class="border-b last:border-b-0 dark:border-b-primary-500 first:rounded-t-md first:rounded-b-none last:rounded-t-none last:rounded-b-md "
            >
              <dashboard-my-book-list-entry
                [myBook]="readingBook"
                [placeholderCover]="bookPlaceholderCover$ | async"
                [showProgress]="true"
              ></dashboard-my-book-list-entry>
            </li>
          </ul>
        </ng-container>
      </article>

      <article id="read-next" class="mb-4">
        <h2 class="text-xl mb-2 capitalize">Read next</h2>
        <ng-container *ngIf="this.readNextBooks$ | async as readNextBooks">
          <ul class="dark:bg-primary-700 border shadow-lg rounded-md">
            <li
              *ngFor="let readNextBook of readNextBooks"
              class="border-b last:border-b-0 dark:border-b-primary-500 first:rounded-t-md first:rounded-b-none last:rounded-t-none last:rounded-b-md "
            >
              <dashboard-my-book-list-entry
                [myBook]="readNextBook"
                [placeholderCover]="bookPlaceholderCover$ | async"
              ></dashboard-my-book-list-entry>
            </li>
          </ul>
        </ng-container>
      </article>

      <article id="recently-read" class="mb-4">
        <h2 class="text-xl mb-2 capitalize">Recently read</h2>
        <ng-container
          *ngIf="this.recentlyReadBooks$ | async as recentlyReadBooks"
        >
          <ul class="dark:bg-primary-700 border shadow-lg rounded-md">
            <li
              *ngFor="let recentlyReadBook of recentlyReadBooks"
              class="border-b last:border-b-0 dark:border-b-primary-500 first:rounded-t-md first:rounded-b-none last:rounded-t-none last:rounded-b-md "
            >
              <dashboard-my-book-list-entry
                [myBook]="recentlyReadBook"
                [placeholderCover]="bookPlaceholderCover$ | async"
              ></dashboard-my-book-list-entry>
            </li>
          </ul>
        </ng-container>
      </article>

      <div class="mb-4">
        <ui-loading *ngIf="isLoading$ | async"></ui-loading>
        <ui-error
          *ngIf="isError$ | async"
          text="Could not reach the server."
        ></ui-error>
      </div>
    </main>
  `,
})
export class HomePageComponent implements OnInit {
  constructor(
    public readonly bookService: BookService,
    public readonly bookOwnershipService: MyBookService,
    public readonly authorService: AuthorService
  ) {}

  public currentlyReadingBooks$?: Observable<MyBookContentType[]>
  public readNextBooks$?: Observable<MyBookContentType[]>
  public recentlyReadBooks$?: Observable<MyBookContentType[]>
  public bookPlaceholderCover$?: Observable<ImageFile>
  public isError$?: Observable<boolean>
  public isLoading$?: Observable<boolean>

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
    this.bookPlaceholderCover$ = this.bookService
      .getBookCoverPlaceholder()
      .pipe(
        filter(
          (request) =>
            request.isSuccess &&
            request.result!.data != null &&
            request.result!.data.attributes.bookCover.data != null
        ),
        map(
          (request) =>
            request.result!.data!.attributes.bookCover.data!.attributes
        )
      )
    const results$ = combineLatest([
      currentlyReadingBooksQuery$,
      readNextBooksQuery$,
      recentlyReadBooksQuery$,
    ])
    this.isLoading$ = results$.pipe(
      map((results) => results.some((result) => result.isLoading))
    )
    this.isError$ = results$.pipe(
      map((results) => results.some((result) => result.error != null))
    )
  }
}
