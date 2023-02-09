import { MyBookService, BookService } from '@angular-micro-frontends/book'
import {
  MyBookAttributes,
  MyBookContentType,
  ID,
  RequestState,
  WithId,
} from '@angular-micro-frontends/type-definitions'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  Observable,
  Subscription,
  filter,
  lastValueFrom,
  map,
  switchMap,
  tap,
} from 'rxjs'

@Component({
  selector: 'dashboard-my-book-update-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="myBook$ | async as myBook">
      <h1 class="text-3xl mb-5 flex items-center gap-3 flex-wrap">
        <span>Update</span>
        <span class="uppercase">
          {{ myBook.attributes.book.data.attributes.title }}
        </span>
        <button
          type="button"
          class="text-base dark:bg-red-600 dark:hover:bg-red-500"
          (click)="onDelete(myBook.id)"
          uiPrimaryButton
        >
          Delete
        </button>
      </h1>
      <dashboard-my-book-update-form
        [myBook]="myBook"
        (update)="onUpdate($event)"
      ></dashboard-my-book-update-form>

      <div class="flex flex-col">
        <ng-container *ngIf="updateRequest$ | async as update">
          <ui-loading *ngIf="update.isLoading" text="Updating"></ui-loading>
          <ui-success *ngIf="update.result != null" text="Updated"></ui-success>
          <ui-error
            *ngIf="update.error != null"
            text="Could not update."
          ></ui-error>
        </ng-container>
        <ui-request-state
          [state]="updateRequest$ | async"
          errorText="Could not update."
        ></ui-request-state>
        <ui-request-state
          [state]="deleteRequest$ | async"
          errorText="Could not delete."
        ></ui-request-state>
      </div>
    </ng-container>
  `,
  styles: [],
})
export class MyBookUpdatePageComponent implements OnInit, OnDestroy {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    public readonly bookService: BookService,
    public readonly myBookService: MyBookService
  ) {}

  public myBook$?: Observable<MyBookContentType>
  public updateRequest$?: Observable<RequestState<MyBookContentType>>
  public deleteRequest$?: Observable<RequestState<MyBookContentType>>
  private subscriptions: Subscription[] = []

  ngOnInit(): void {
    this.myBook$ = this.route.params.pipe(
      map((params) => +params['id']),
      switchMap((id) =>
        this.myBookService.getMyBook(id).pipe(
          filter((request) => request.result?.data != null),
          map((request) => request.result!.data!)
        )
      )
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  onUpdate(myBook: Partial<MyBookAttributes>) {
    this.updateRequest$ = this.myBookService.updateMyBook(
      +this.route.snapshot.params['id'],
      myBook
    )
    this.subscriptions.push(
      this.updateRequest$
        .pipe(filter((request) => request.isSuccess))
        .subscribe(() => this.navigateBackWithId())
    )
  }

  onDelete(id: ID) {
    this.deleteRequest$ = this.myBookService.deleteMyBook(id)
    this.subscriptions.push(
      this.deleteRequest$
        .pipe(filter((request) => request.isSuccess))
        .subscribe(() => this.navigateBack())
    )
  }

  navigateBack() {
    this.router.navigate(['/'])
  }

  navigateBackWithId() {
    this.router.navigate(['/'], {
      queryParams: {
        myBookId: this.route.snapshot.params['id'],
      },
    })
  }
}
