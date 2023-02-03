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
  combineLatestAll,
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
              *ngIf="bookOwnership$ | async as bookOwnership"
              type="button"
              class="text-base dark:bg-red-600 dark:hover:bg-red-500"
              (click)="onDelete(bookOwnership.id)"
              uiSecondaryButton
            >
              Delete
            </button>
          </ng-template>
        </h1>
        <ng-container *ngIf="bookOptions$ | async as bookOptions">
          <dashboard-book-ownership-form
            [bookOptions]="bookOptions"
            [bookOwnership]="bookOwnership$ | async"
            [mode]="mode"
            (save)="onSubmit($event)"
          ></dashboard-book-ownership-form>
        </ng-container>
        <ng-container *ngIf="bookOwnershipMutations$ | async as mutation">
          <ui-success
            *ngIf="mutation.result != null && mutation.result.error == null"
          ></ui-success>
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
export class MyBookPageComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    public readonly bookOwnershipService: BookOwnershipService,
    public readonly bookService: BookService
  ) {}

  public bookOptions$?: Observable<BookContentType[]>
  public bookOwnership$?: Observable<BookOwnershipContentType>
  public bookOwnershipBookTitle$?: Observable<string>
  public bookOwnershipMutations$?: Observable<Result<BookOwnershipContentType>>
  public mode: 'update' | 'create' = 'create'

  ngOnInit(): void {
    const bookOwnershipResult$ = this.route.params.pipe(
      filter((params) => params['id'] != null),
      switchMap((params) =>
        this.bookOwnershipService.queryBookOwnership(+params['id'])
      )
    )
    this.bookOwnership$ = bookOwnershipResult$.pipe(
      filter((result) => result.result?.data != null),
      map((result) => result.result!.data!)
    )
    this.bookOwnershipBookTitle$ = bookOwnershipResult$.pipe(
      map(
        (ownershipResult) =>
          ownershipResult.result?.data?.attributes?.book?.data?.attributes
            ?.title
      ),
      filter((title): title is string => title != null)
    )
    this.bookOptions$ = combineLatest([
      this.bookService.queryBooks(),
      this.bookOwnershipService.queryBookOwnerships(),
    ]).pipe(
      filter(
        ([options, ownerships]) =>
          options.result != null && ownerships.result != null
      ),
      map(([options, ownerships]) => {
        const bookOptions = options.result?.data ?? []
        const bookOwnerships = ownerships.result?.data ?? []
        const bookOwnershipsBookIds = bookOwnerships.map(
          (ownership) => ownership.attributes.book.data.id
        )
        return bookOptions.filter(
          (book) => !bookOwnershipsBookIds.includes(book.id)
        )
      })
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
