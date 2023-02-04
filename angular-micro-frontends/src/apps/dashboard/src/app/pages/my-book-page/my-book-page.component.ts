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
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable, combineLatest, filter, map, switchMap, tap } from 'rxjs'

@Component({
  selector: 'dashboard-overview-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="mode$ | async as mode">
      <div>Mode: {{ mode }}</div>
      <ng-container *ngIf="mode.name === 'create'; else myBookUpdate">
        <dashboard-my-book-create></dashboard-my-book-create>
      </ng-container>
      <ng-template #myBookUpdate>
        <ng-container *ngIf="myBook$ | async as myBook">
          <dashboard-my-book-update [id]=""></dashboard-my-book-update>
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

  public newBookOptions$?: Observable<BookContentType[]>
  public myBook$?: Observable<BookOwnershipContentType>
  public myBookMutations$?: Observable<Result<BookOwnershipContentType>>
  public mode$?: Observable<{ name: 'update'; id: number } | { name: 'create' }>

  ngOnInit(): void {
    this.mode$ = this.route.params.pipe(
      map((params) => {
        if (params['id'] == null) {
          return {
            name: 'create',
          }
        }
        return {
          name: 'update',
          id: +params['id'],
        }
      })
    )
    // this.mode$.pipe(
    //   tap((mode) => {
    //     console.log('Mode changed to ', mode)
    //     if (mode === 'create') {
    //       this.newBookOptions$ = combineLatest([
    //         this.bookService.queryBooks().pipe(
    //           filter(
    //             (books) => books.result != null && books.result.data != null
    //           ),
    //           map((books) => books.result!.data!)
    //         ),
    //         this.bookOwnershipService.queryBookOwnerships(),
    //       ]).pipe(
    //         filter(
    //           ([_books, myBookResults]) =>
    //             myBookResults.result != null &&
    //             myBookResults.result.data != null
    //         ),
    //         map(([books, myBookResults]) => {
    //           const myBooks = myBookResults.result!.data!
    //           const myBookBookIds = myBooks.map(
    //             (myBook) => myBook.attributes.book.data.id
    //           )
    //           return books.filter((book) => !myBookBookIds.includes(book.id))
    //         }),
    //         tap((options) => console.log('bookOptions', options))
    //       )
    //       this.myBook$ = this.route.params.pipe(
    //         filter((params) => params['id'] != null),
    //         switchMap((params) =>
    //           this.bookOwnershipService.queryBookOwnership(+params['id'])
    //         ),
    //         filter((result) => result.result?.data != null),
    //         map((result) => result.result!.data!),
    //         tap((myBook) => console.log('update myBook', myBook))
    //       )
    //     }
    //   })
    // )
  }

  onUpdate(bookOwnership: WithId<BookOwnershipAttributes>) {
    this.myBookMutations$ =
      this.bookOwnershipService.updateBookOwnership(bookOwnership)
  }

  onDelete(id: ID) {
    this.myBookMutations$ = this.bookOwnershipService.deleteBookOwnership(id)
  }
}
