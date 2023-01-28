import {
  AuthorService,
  BookOwnershipContentType,
  BookOwnershipService,
  BookService,
  Result,
} from '@angular-micro-frontends/book'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      article {
        @apply mb-4;
      }

      h1 {
        @apply uppercase text-xl mb-2;
      }

      ul {
        @apply px-5 py-1 dark:bg-slate-700 dark:border-slate-600 border shadow-lg rounded-md;
      }

      li {
        @apply dark:border-b-slate-500 border-b last:border-b-0 py-3 cursor-pointer;
      }
    `,
  ],
  template: `
    <main>
      <article id="currently-reading">
        <h1>Currently reading</h1>
        <ng-container
          *ngIf="this.currentlyReadingBooksQuery$ | async as readingQuery"
        >
          <ul *ngIf="readingQuery.result != null">
            <li
              *ngFor="let readingBook of readingQuery.result.data"
              [routerLink]="['/my-book', readingBook.id]"
            >
              {{ readingBook.attributes.book.data.attributes.title }}
            </li>
          </ul>
          <ui-loading *ngIf="readingQuery.isLoading"></ui-loading>
          <ui-error *ngIf="readingQuery.error"></ui-error>
        </ng-container>
      </article>

      <article id="read-next">
        <h1>Read next</h1>
        <ng-container *ngIf="this.readNextBooksQuery$ | async as readNextQuery">
          <ul *ngIf="readNextQuery.result != null" uiCard>
            <li
              *ngFor="let readNextBook of readNextQuery.result.data"
              [routerLink]="['/my-book', readNextBook.id]"
            >
              {{ readNextBook.attributes.book.data.attributes.title }}
            </li>
          </ul>
          <ui-loading *ngIf="readNextQuery.isLoading"></ui-loading>
          <ui-error *ngIf="readNextQuery.error"></ui-error>
        </ng-container>
      </article>

      <article id="recently-read">
        <h1>Recently read</h1>
        <ng-container
          *ngIf="this.recentlyReadBooksQuery$ | async as recentlyReadQuery"
        >
          <ul *ngIf="recentlyReadQuery.result != null" uiCard>
            <li
              *ngFor="let recentlyReadBook of recentlyReadQuery.result.data"
              [routerLink]="['/my-book', recentlyReadBook.id]"
            >
              {{ recentlyReadBook.attributes.book.data.attributes.title }}
            </li>
          </ul>
          <ui-loading *ngIf="recentlyReadQuery.isLoading"></ui-loading>
          <ui-error *ngIf="recentlyReadQuery.error"></ui-error>
        </ng-container>
      </article>

      <article id="add-book" class="pt-4">
        <a routerLink="/my-book/new" uiPrimaryButton>Add a new book</a>
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

  public currentlyReadingBooksQuery$?: Observable<
    Result<BookOwnershipContentType[]>
  >
  public readNextBooksQuery$?: Observable<Result<BookOwnershipContentType[]>>
  public recentlyReadBooksQuery$?: Observable<
    Result<BookOwnershipContentType[]>
  >

  ngOnInit(): void {
    this.currentlyReadingBooksQuery$ =
      this.bookOwnershipService.queryCurrentlyReadingBooks()
    this.readNextBooksQuery$ = this.bookOwnershipService.queryReadNextBooks()
    this.recentlyReadBooksQuery$ =
      this.bookOwnershipService.queryRecentlyReadBooks()
  }
}
