import {
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
  Input,
  OnInit,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable, filter, map, switchMap, tap } from 'rxjs'

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
  public updateMutation$?: Observable<Result<BookOwnershipContentType>>
  public deleteMutation$?: Observable<Result<BookOwnershipContentType>>

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

  //     }
  //   })
  // )
}
