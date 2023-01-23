import {
  AuthorService,
  BookOwnershipService,
  BookService,
} from '@angular-micro-frontends/book'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
  template: `
    <main>
      <article id="currently-reading" class="mb-4">
        <h1 class="uppercase text-xl mb-2">Currently reading</h1>
        <ng-container
          *ngIf="
            bookOwnershipService.currentlyReadingBooksQuery$
              | async as readingQuery
          "
        >
          <ul *ngIf="readingQuery.data != null" uiCard>
            <li *ngFor="let readingBook of readingQuery.data.data" class="py-3">
              {{ readingBook.attributes.book.data.attributes.title }}
            </li>
          </ul>
          <ui-loading *ngIf="readingQuery.isLoading"></ui-loading>
          <ui-error *ngIf="readingQuery.error"></ui-error>
        </ng-container>
      </article>

      <article id="read-next" class="mb-4">
        <h1 class="uppercase text-xl mb-2">Read next</h1>
        <ng-container
          *ngIf="
            bookOwnershipService.readNextBooksQuery$ | async as readNextQuery
          "
        >
          <ul *ngIf="readNextQuery.data != null" uiCard>
            <li
              *ngFor="let book of readNextQuery.data.data"
              class="dark:border-b-slate-500 border-b last:border-b-0 py-3"
            >
              {{ book.attributes.book.data.attributes.title }}
            </li>
          </ul>
          <ui-loading *ngIf="readNextQuery.isLoading"></ui-loading>
          <ui-error *ngIf="readNextQuery.error"></ui-error>
        </ng-container>
      </article>

      <article id="recently-read" class="mb-4">
        <h1 class="uppercase text-xl mb-2">Recently read</h1>
        <ng-container
          *ngIf="
            bookOwnershipService.recentlyReadBooksQuery$
              | async as recentlyReadQuery
          "
        >
          <ul *ngIf="recentlyReadQuery.data != null" uiCard>
            <li *ngFor="let book of recentlyReadQuery.data.data" class="py-3">
              {{ book.attributes.book.data.attributes.title }}
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

  ngOnInit(): void {
    this.bookOwnershipService.queryCurrentlyReadingBooks()
    this.bookOwnershipService.queryReadNextBooks()
    this.bookOwnershipService.queryRecentlyReadBooks()
  }
}
