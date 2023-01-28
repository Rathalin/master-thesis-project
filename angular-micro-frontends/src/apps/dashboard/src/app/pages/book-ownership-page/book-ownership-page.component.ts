import {
  BookContentType,
  BookOwnershipAttributes,
  BookOwnershipContentType,
  BookOwnershipService,
  BookService,
  ID,
  Result,
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
        <h1 *ngIf="mode != null" class="text-3xl mb-5 flex items-center gap-3">
          <ng-container *ngIf="mode === 'create'; else titleUpdate">
            <span>Add a new Book</span>
          </ng-container>
          <ng-template #titleUpdate>
            <span>Update</span>
            <span
              *ngIf="bookOwnershipBookTitle$ | async as bookOwnershipBookTitle"
              class="uppercase"
            >
              {{ bookOwnershipBookTitle }}
            </span>
            <button
              *ngIf="bookOwnership$ | async as bookOwnershipQuery"
              type="button"
              class="text-base dark:bg-red-600 dark:hover:bg-red-500"
              (click)="onDelete(bookOwnershipQuery.result?.data?.id ?? -1)"
              uiSecondaryButton
            >
              Delete
            </button>
          </ng-template>
        </h1>
        <dashboard-book-ownership-form
          [bookOptionsQuery]="bookOptions$ | async"
          [bookOwnershipQuery]="bookOwnership$ | async"
          [mode]="mode"
          (save)="onSubmit($event)"
        ></dashboard-book-ownership-form>
        <ng-container *ngIf="bookOwnershipMutations$ | async as mutation">
          <ui-loading *ngIf="mutation.isLoading"></ui-loading>
          <ui-error
            *ngIf="mutation.error != null"
            text="Could not reach the server."
          ></ui-error>
        </ng-container>
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

  public bookOptions$?: Observable<Result<BookContentType[]>>
  public bookOwnership$?: Observable<Result<BookOwnershipContentType>>
  public bookOwnershipBookTitle$?: Observable<string>
  public bookOwnershipMutations$?: Observable<Result<BookOwnershipContentType>>
  public mode: 'update' | 'create' = 'create'

  ngOnInit(): void {
    this.bookOptions$ = this.bookService.queryBooks()
    this.bookOwnership$ = this.route.params.pipe(
      filter((params) => params['id'] != null),
      switchMap((params) =>
        this.bookOwnershipService.queryBookOwnership(+params['id'])
      )
    )
    this.bookOwnershipBookTitle$ = this.bookOwnership$.pipe(
      map(
        (bookOwnershipQuery) =>
          bookOwnershipQuery.result?.data?.attributes?.book?.data?.attributes
            ?.title
      ),
      filter((title): title is string => title != null)
    )
    this.mode =
      this.route.snapshot.params['id'] != null
        ? ('update' as const)
        : ('create' as const)
  }

  onSubmit(bookOwnership: WithId<BookOwnershipAttributes>) {
    if (this.mode === null) return
    if (this.mode === 'create') {
      this.bookOwnershipMutations$ =
        this.bookOwnershipService.createBookOwnership(bookOwnership)
    } else {
      this.bookOwnershipMutations$ =
        this.bookOwnershipService.updateBookOwnership(bookOwnership)
    }
  }

  onDelete(id: ID) {
    this.bookOwnershipMutations$ =
      this.bookOwnershipService.deleteBookOwnership(id)
  }
}
