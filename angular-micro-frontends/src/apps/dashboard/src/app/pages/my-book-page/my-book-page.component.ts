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
    <ng-container *ngIf="mode$ | async as mode">
      <ng-container *ngIf="mode === 'create'; else myBookUpdate">
        <h1 class="text-3xl mb-5 flex items-center gap-3">
          <span>Add a new Book</span>
        </h1>
        <dashboard-my-book-create
          [bookOptions]="(bookOptions$ | async) ?? []"
          (create)="onCreate($event)"
        ></dashboard-my-book-create>
      </ng-container>
      <ng-template #myBookUpdate>
        <ng-container *ngIf="myBook$ | async as myBook">
          <h1 class="text-3xl mb-5 flex items-center gap-3">
            <span>Update</span>
            <span class="uppercase">
              {{ myBook.attributes.book.data.attributes.title }}
            </span>
            <button
              type="button"
              class="text-base dark:bg-red-600 dark:hover:bg-red-500"
              (click)="onDelete(myBook.id)"
              uiSecondaryButton
            >
              Delete
            </button>
          </h1>
          <dashboard-my-book-update
            [bookOptions]="(bookOptions$ | async) ?? []"
            [myBook]="myBook"
            (update)="onUpdate($event)"
          ></dashboard-my-book-update>
        </ng-container>
      </ng-template>

      <ng-container *ngIf="myBookMutations$ | async as mutation">
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
  public myBook$?: Observable<BookOwnershipContentType>
  public myBookMutations$?: Observable<Result<BookOwnershipContentType>>
  public mode$?: Observable<'update' | 'create'>

  ngOnInit(): void {
    this.mode$ = this.route.params.pipe(
      map((params) => (params['id'] != null ? 'update' : 'create')),
      tap((mode) => console.log('mode', mode))
    )
    this.myBook$ = this.route.params.pipe(
      filter((params) => params['id'] != null),
      switchMap((params) =>
        this.bookOwnershipService.queryBookOwnership(+params['id'])
      ),
      filter((result) => result.result?.data != null),
      map((result) => result.result!.data!),
      tap((myBook) => console.log('myBook', myBook))
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
  }

  onCreate(bookOwnership: BookOwnershipAttributes) {
    this.myBookMutations$ =
      this.bookOwnershipService.createBookOwnership(bookOwnership)
  }

  onUpdate(bookOwnership: WithId<BookOwnershipAttributes>) {
    this.myBookMutations$ =
      this.bookOwnershipService.updateBookOwnership(bookOwnership)
  }

  onDelete(id: ID) {
    this.myBookMutations$ = this.bookOwnershipService.deleteBookOwnership(id)
  }
}
