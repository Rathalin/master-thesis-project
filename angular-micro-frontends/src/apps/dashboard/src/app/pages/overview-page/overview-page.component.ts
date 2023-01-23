import { BookService } from '@angular-micro-frontends/book'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { BehaviorSubject, of } from 'rxjs'

@Component({
  selector: 'dashboard-overview-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>
      <h1>Overview</h1>
      <ng-container *ngIf="bookSerice.booksQuery$ | async as booksQuery">
        <ng-container *ngIf="booksQuery.data != null">
          <ul>
            <li *ngFor="let book of booksQuery.data.data">
              {{ book.attributes.title }}
            </li>
          </ul>
        </ng-container>
        <ui-loading *ngIf="booksQuery.isLoading"></ui-loading>
        <ui-error *ngIf="booksQuery.error"></ui-error>
      </ng-container>
    </ng-container>
  `,
  styles: [],
})
export class OverviewPageComponent implements OnInit {
  constructor(public readonly bookSerice: BookService) {}

  ngOnInit(): void {
    this.bookSerice.queryBooks()
  }
}
