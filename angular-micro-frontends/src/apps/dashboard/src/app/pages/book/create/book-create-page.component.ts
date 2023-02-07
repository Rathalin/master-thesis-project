import { AuthorService } from '@angular-micro-frontends/book'
import {
  AuthorAttributes,
  AuthorContentType,
  RequestState,
} from '@angular-micro-frontends/type-definitions'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, Subscription, filter, map } from 'rxjs'

@Component({
  selector: 'dashboard-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>
      <ng-container>
        <h1></h1>
      </ng-container>

      <ng-container
        *ngIf="authorOptionsRequest$ | async as authorOptionsRequest"
      >
        <ng-container *ngIf="authorOptionsRequest.isSuccess">
          <dashboard-book-create-form
            [authorOptions]="authorOptionsRequest.result!.data!"
          ></dashboard-book-create-form>
        </ng-container>
      </ng-container>

      <!-- <ui-request-statem 
        [state]="authorOptionsRequest$ | async"
      ></ui-request-statem> -->
    </ng-container>
  `,
  styles: [],
})
export class BookCreatePageComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly authorService: AuthorService
  ) {}

  public authorOptionsRequest$?: Observable<RequestState<AuthorContentType[]>>
  public createRequest$?: Observable<RequestState<AuthorContentType>>
  public subscriptions: Subscription[] = []

  ngOnInit(): void {
    this.authorOptionsRequest$ = this.authorService.getAuthors()
  }

  onCreate(author: AuthorAttributes) {
    this.createRequest$ = this.authorService.createAuthor(author)
    this.subscriptions.push(
      this.createRequest$
        .pipe(filter((request) => request.isSuccess))
        .subscribe(() => this.router.navigate(['/']))
    )
  }
}
