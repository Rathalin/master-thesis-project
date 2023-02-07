import { AuthorService } from '@angular-micro-frontends/book'
import {
  AuthorAttributes,
  AuthorContentType,
  RequestState,
} from '@angular-micro-frontends/type-definitions'
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription, filter, map } from 'rxjs'

@Component({
  selector: 'dashboard-author-update-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>
      <ng-container *ngIf="author$ | async as author">
        <h1 class="text-3xl mb-5 flex items-center gap-3">
          <span>Update author</span>
        </h1>
        <dashboard-author-update-form
          [author]="author"
          (update)="onUpdate($event)"
        ></dashboard-author-update-form>
      </ng-container>

      <ui-request-state
        [state]="getRequest$ | async"
        [hideLoading]="true"
        [hideSuccess]="true"
        errorText="Could not load the author."
      ></ui-request-state>
      <ui-request-state
        [state]="updateRequest$ | async"
        errorText="Could not update the author."
      ></ui-request-state>
      <!-- <ui-request-state
        [state]="deleteRequest$ | async"
        errorText="Could not delete the author."
      ></ui-request-state> -->
    </ng-container>
  `,
  styles: [],
})
export class AuthorUpdatePageComponent implements OnInit, OnDestroy {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authorService: AuthorService
  ) {}

  public getRequest$?: Observable<RequestState<AuthorContentType>>
  public author$?: Observable<AuthorContentType>
  public updateRequest$?: Observable<RequestState<AuthorContentType>>
  // public deleteRequest$?: Observable<RequestState<AuthorContentType>>
  private subscriptions: Subscription[] = []

  ngOnInit(): void {
    this.getRequest$ = this.authorService.getAuthor(
      +this.route.snapshot.params['id']
    )
    this.author$ = this.getRequest$.pipe(
      filter((request) => request.result?.data != null),
      map((request) => request.result!.data!)
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  onUpdate(authorData: Partial<AuthorAttributes>) {
    this.updateRequest$ = this.authorService.updateAuthor(
      +this.route.snapshot.params['id'],
      authorData
    )
    this.subscriptions.push(
      this.updateRequest$
        .pipe(filter((request) => request.isSuccess))
        .subscribe(() => this.router.navigate(['/']))
    )
  }

  // onDelete() {
  //   this.deleteRequest$ = this.authorService.deleteAuthor(
  //     +this.route.snapshot.params['id']
  //   )
  //   this.subscriptions.push(
  //     this.deleteRequest$
  //       .pipe(filter((request) => request.isSuccess))
  //       .subscribe(() => this.router.navigate(['/']))
  //   )
  // }
}
