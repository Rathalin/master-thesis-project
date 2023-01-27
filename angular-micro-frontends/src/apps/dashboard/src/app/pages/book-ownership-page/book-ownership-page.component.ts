import {
  BookContentType,
  BookOwnershipAttributes,
  BookOwnershipContentType,
  BookOwnershipService,
  BookService,
  QueryMany,
  QueryOne,
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
        <h1 *ngIf="mode != null" class="text-3xl uppercase">
          {{ mode === 'CREATE' ? 'Create' : 'Edit' }}
        </h1>
        <dashboard-book-ownership-form
          [bookOptionsQuery]="bookOptions$ | async"
          [bookOwnershipQuery]="bookOwnership$ | async"
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

  public bookOwnership$?: Observable<QueryOne<BookOwnershipContentType>>
  public bookOptions$?: Observable<QueryMany<BookContentType>>
  public mode: 'CREATE' | 'EDIT' | null = null

  ngOnInit(): void {
    this.bookOwnership$ = this.route.params.pipe(
      filter((params) => params['id'] != null),
      switchMap((params) =>
        this.bookOwnershipService.queryBookOwnership(+params['id'])
      )
    )
    this.bookOptions$ = this.bookService.queryBooks()
    this.mode = this.route.snapshot.params['id'] != null ? 'EDIT' : 'CREATE'
  }

  onSubmit(bookOwnership: WithId<BookOwnershipAttributes>) {
    if (this.mode === null) return
    if (this.mode === 'CREATE') {
      this.bookOwnershipService.createBookOwnership(bookOwnership)
    } else {
      this.bookOwnershipService.updateBookOwnership(bookOwnership)
    }
  }
}
