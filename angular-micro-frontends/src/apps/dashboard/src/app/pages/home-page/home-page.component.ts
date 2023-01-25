import {
  AuthorService,
  BookOwnershipContentType,
  BookOwnershipService,
  BookService,
  QueryMany,
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
          <ul *ngIf="readingQuery.data != null">
            <li
              *ngFor="let readingBook of readingQuery.data.data"
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
          <ul *ngIf="readNextQuery.data != null" uiCard>
            <li
              *ngFor="let readNextBook of readNextQuery.data.data"
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
          <ul *ngIf="recentlyReadQuery.data != null" uiCard>
            <li
              *ngFor="let recentlyReadBook of recentlyReadQuery.data.data"
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
  @Input() public mode: 'CREATE' | 'EDIT' = 'CREATE'

  constructor(
    public readonly bookService: BookService,
    public readonly bookOwnershipService: BookOwnershipService,
    public readonly authorService: AuthorService
  ) {}

  public currentlyReadingBooksQuery$?: Observable<
    QueryMany<BookOwnershipContentType>
  >
  public readNextBooksQuery$?: Observable<QueryMany<BookOwnershipContentType>>
  public recentlyReadBooksQuery$?: Observable<
    QueryMany<BookOwnershipContentType>
  >

  ngOnInit(): void {
    this.currentlyReadingBooksQuery$ =
      this.bookOwnershipService.queryCurrentlyReadingBooks()
    this.readNextBooksQuery$ = this.bookOwnershipService.queryReadNextBooks()
    this.recentlyReadBooksQuery$ =
      this.bookOwnershipService.queryRecentlyReadBooks()
  }

  onBookOwnershipClick(id: number): void {
    // TODO
  }
}
