import {
  BookOwnershipService,
  BookService,
} from '@angular-micro-frontends/book'
import {
  BookOwnershipAttributes,
  BookOwnershipContentType,
  ID,
  RequestState,
  WithId,
} from '@angular-micro-frontends/type-definitions'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable, filter, lastValueFrom, map, switchMap, tap } from 'rxjs'

@Component({
  selector: 'dashboard-my-book-update-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
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
      <dashboard-my-book-update-form
        [myBook]="myBook"
        (update)="onUpdate($event)"
      ></dashboard-my-book-update-form>

      <div class="flex flex-col">
        <ng-container *ngIf="updateMutation$ | async as update">
          <ui-loading *ngIf="update.isLoading" text="Updating"></ui-loading>
          <ui-success *ngIf="update.result != null" text="Updated"></ui-success>
          <ui-error
            *ngIf="update.error != null"
            text="Could not update."
          ></ui-error>
        </ng-container>
        <ng-container *ngIf="deleteMutation$ | async as delete">
          <ui-loading *ngIf="delete.isLoading" text="Deleting"></ui-loading>
          <ui-success
            *ngIf="delete.result?.data != null"
            text="Deleted"
          ></ui-success>
          <ui-error
            *ngIf="delete.error != null || delete.result?.error != null"
            text="Could not delete."
          ></ui-error>
        </ng-container>
      </div>
    </ng-container>
  `,
  styles: [],
})
export class MyBookUpdatePageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public readonly bookService: BookService,
    public readonly myBookService: BookOwnershipService
  ) {}

  public myBook$?: Observable<BookOwnershipContentType>
  public updateMutation$?: Observable<RequestState<BookOwnershipContentType>>
  public deleteMutation$?: Observable<RequestState<BookOwnershipContentType>>

  ngOnInit(): void {
    this.myBook$ = this.route.params.pipe(
      map((params) => +params['id']),
      switchMap((id) =>
        this.myBookService.queryBookOwnership(id).pipe(
          filter((result) => result.result?.data != null),
          map((result) => result.result!.data!)
        )
      )
    )
  }

  onUpdate(bookOwnership: WithId<BookOwnershipAttributes>) {
    this.updateMutation$ = this.myBookService.updateBookOwnership(bookOwnership)
  }

  onDelete(id: ID) {
    this.deleteMutation$ = this.myBookService.deleteBookOwnership(id)
  }
}
