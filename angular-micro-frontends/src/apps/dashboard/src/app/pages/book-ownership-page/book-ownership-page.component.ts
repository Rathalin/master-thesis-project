import {
  BookOwnershipCollection,
  BookOwnershipService,
  BookService,
  QueryOne,
} from '@angular-micro-frontends/book'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute, Route, Router } from '@angular/router'
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  of,
  switchMap,
} from 'rxjs'

@Component({
  selector: 'dashboard-overview-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>
      <h1>Your book</h1>
      <ng-container *ngIf="this.bookOwnership$ | async as bookOwnershipQuery">
        <ng-container *ngIf="bookOwnershipQuery.data != null">
          <div>
            {{
              bookOwnershipQuery.data.data.attributes.book.data.attributes.title
            }}
          </div>
          <dashboard-book-ownership-form></dashboard-book-ownership-form>
        </ng-container>
        <ui-loading *ngIf="bookOwnershipQuery.isLoading"></ui-loading>
        <ui-error *ngIf="bookOwnershipQuery.error != null"></ui-error>
      </ng-container>
    </ng-container>
  `,
  styles: [],
})
export class BookOwnershipPageComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    public readonly bookOwnershipService: BookOwnershipService
  ) {}

  public bookOwnership$?: Observable<QueryOne<BookOwnershipCollection>>

  ngOnInit(): void {
    this.bookOwnership$ = this.route.params.pipe(
      switchMap((params) =>
        this.bookOwnershipService.queryBookOwnership(+params['id'])
      )
    )
  }
}
