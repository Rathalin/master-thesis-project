import {
  AuthorService,
  BookOwnershipService,
  BookService,
} from '@angular-micro-frontends/book'
import { BookOwnershipContentType } from '@angular-micro-frontends/type-definitions'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Observable, combineLatest, filter, map } from 'rxjs'

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
  template: `
    <main>
      <article id="currently-reading" class="mb-4">
        <h1 class="uppercase text-xl mb-2">Currently reading</h1>
        <ng-container
          *ngIf="this.currentlyReadingBooks$ | async as readingBooks"
        >
          <ul
            class="px-5 py-1 dark:bg-slate-700 dark:border-slate-600 border shadow-lg rounded-md"
          >
            <li
              *ngFor="let readingBook of readingBooks"
              [routerLink]="['/my-book', readingBook.id]"
              class="dark:border-b-slate-500 border-b last:border-b-0 py-3 cursor-pointer"
            >
              <dashboard-my-book-reading
                [myBook]="readingBook"
              ></dashboard-my-book-reading>
            </li>
          </ul>
        </ng-container>
      </article>

      <article id="read-next" class="mb-4">
        <h1 class="uppercase text-xl mb-2">Read next</h1>
        <ng-container *ngIf="this.readNextBooks$ | async as readNextBooks">
          <ul
            class="px-5 py-1 dark:bg-slate-700 dark:border-slate-600 border shadow-lg rounded-md"
          >
            <li
              *ngFor="let readNextBook of readNextBooks"
              [routerLink]="['/my-book', readNextBook.id]"
              class="dark:border-b-slate-500 border-b last:border-b-0 py-3 cursor-pointer"
            >
              <dashboard-my-book-not-read
                [myBook]="readNextBook"
              ></dashboard-my-book-not-read>
            </li>
          </ul>
        </ng-container>
      </article>

      <article id="recently-read" class="mb-4">
        <h1 class="uppercase text-xl mb-2">Recently read</h1>
        <ng-container
          *ngIf="this.recentlyReadBooks$ | async as recentlyReadBooks"
        >
          <ul
            class="px-5 py-1 dark:bg-slate-700 dark:border-slate-600 border shadow-lg rounded-md"
          >
            <li
              *ngFor="let recentlyReadBook of recentlyReadBooks"
              [routerLink]="['/my-book', recentlyReadBook.id]"
              class="dark:border-b-slate-500 border-b last:border-b-0 py-3 cursor-pointer"
            >
              <dashboard-my-book-read
                [myBook]="recentlyReadBook"
              ></dashboard-my-book-read>
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

      <article id="add-book" class="pt-4">
        <a routerLink="/my-book/new" uiPrimaryButton>Add a book to my list</a>
      </article>
    </main>
  `,
})
export class HomePageComponent implements OnInit {
  constructor(
    public readonly bookService: BookService,
    public readonly bookOwnershipService: BookOwnershipService,
    public readonly authorService: AuthorService
  ) {}

  public currentlyReadingBooks$?: Observable<BookOwnershipContentType[]>
  public readNextBooks$?: Observable<BookOwnershipContentType[]>
  public recentlyReadBooks$?: Observable<BookOwnershipContentType[]>
  public isError$?: Observable<boolean>
  public isLoading$?: Observable<boolean>

  ngOnInit(): void {
    const currentlyReadingBooksQuery$ =
      this.bookOwnershipService.queryCurrentlyReadingBooks()
    this.currentlyReadingBooks$ = currentlyReadingBooksQuery$.pipe(
      filter((query) => query.result != null && query.result.data != null),
      map((query) => query.result!.data!)
    )
    const readNextBooksQuery$ = this.bookOwnershipService.queryReadNextBooks()
    this.readNextBooks$ = readNextBooksQuery$.pipe(
      filter((query) => query.result != null && query.result.data != null),
      map((query) => query.result!.data!)
    )
    const recentlyReadBooksQuery$ =
      this.bookOwnershipService.queryRecentlyReadBooks()
    this.recentlyReadBooks$ = recentlyReadBooksQuery$.pipe(
      filter((query) => query.result != null && query.result.data != null),
      map((query) => query.result!.data!)
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
