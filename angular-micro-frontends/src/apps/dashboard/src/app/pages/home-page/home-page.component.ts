import {
  AuthorService,
  BookOwnershipCollection,
  BookOwnershipService,
  BookService,
  QueryMany,
} from '@angular-micro-frontends/book'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
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
            <li *ngFor="let readingBook of readingQuery.data.data">
              <a [routerLink]="['/my-book', readingBook.id]">
                {{ readingBook.attributes.book.data.attributes.title }}
              </a>
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
            <li *ngFor="let readNextBook of readNextQuery.data.data">
              <a [routerLink]="['/my-book', readNextBook.id]">
                {{ readNextBook.attributes.book.data.attributes.title }}
              </a>
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
            <li *ngFor="let recentlyReadBook of recentlyReadQuery.data.data">
              <a [routerLink]="['/my-book', recentlyReadBook.id]">
                {{ recentlyReadBook.attributes.book.data.attributes.title }}
              </a>
            </li>
          </ul>
          <ui-loading *ngIf="recentlyReadQuery.isLoading"></ui-loading>
          <ui-error *ngIf="recentlyReadQuery.error"></ui-error>
        </ng-container>
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
    QueryMany<BookOwnershipCollection>
  >
  public readNextBooksQuery$?: Observable<QueryMany<BookOwnershipCollection>>
  public recentlyReadBooksQuery$?: Observable<
    QueryMany<BookOwnershipCollection>
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
