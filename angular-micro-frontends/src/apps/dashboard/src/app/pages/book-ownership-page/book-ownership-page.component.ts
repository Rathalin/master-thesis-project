import {
  BookContentType,
  BookOwnershipAttributes,
  BookOwnershipContentType,
  BookOwnershipService,
  BookService,
  Query,
  WithId,
} from '@angular-micro-frontends/book'
import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { ActivatedRoute, Route, Router } from '@angular/router'
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  filter,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs'

@Component({
  selector: 'dashboard-overview-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>
      <ng-container>
        <h1 *ngIf="mode != null" class="text-3xl mb-5">
          <ng-container *ngIf="mode === 'create'; else titleCreate">
            <span>Create</span>
          </ng-container>
          <ng-template #titleCreate>
            <span>Update</span>
            <span
              *ngIf="bookOwnershipBookTitle$ | async as bookOwnershipBookTitle"
              class="uppercase"
            >
              {{ bookOwnershipBookTitle }}
            </span>
          </ng-template>
        </h1>
        <dashboard-book-ownership-form
          [bookOptionsQuery]="bookOptions$ | async"
          [bookOwnershipQuery]="bookOwnership$ | async"
          [mode]="mode"
          (save)="onSubmit($event)"
        ></dashboard-book-ownership-form>
      </ng-container>
    </ng-container>
  `,
  styles: [],
})
export class BookOwnershipPageComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    public readonly bookOwnershipService: BookOwnershipService,
    public readonly bookService: BookService
  ) {}

  public bookOwnership$?: Observable<Query<BookOwnershipContentType>>
  public bookOwnershipBookTitle$?: Observable<string>
  public bookOptions$?: Observable<Query<BookContentType[]>>
  public mode: 'create' | 'update' = 'create'

  ngOnInit(): void {
    this.bookOwnership$ = this.route.params.pipe(
      filter((params) => params['id'] != null),
      switchMap((params) =>
        this.bookOwnershipService.queryBookOwnership(+params['id'])
      )
    )
    this.bookOwnershipBookTitle$ = this.bookOwnership$.pipe(
      map(
        (bookOwnershipQuery) =>
          bookOwnershipQuery.data?.data?.attributes?.book?.data?.attributes
            ?.title
      ),
      filter((title): title is string => title != null)
    )
    this.bookOptions$ = this.bookService.queryBooks()
    this.mode = this.route.snapshot.params['id'] != null ? 'update' : 'create'
  }

  onSubmit(bookOwnership: WithId<BookOwnershipAttributes>) {
    if (this.mode === null) return
    if (this.mode === 'create') {
      this.bookOwnershipService.createBookOwnership(bookOwnership)
    } else {
      this.bookOwnershipService.updateBookOwnership(bookOwnership)
    }
  }
}
