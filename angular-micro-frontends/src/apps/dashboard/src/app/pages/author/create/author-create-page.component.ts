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
import { Router } from '@angular/router'
import { Observable, Subscription, filter } from 'rxjs'

@Component({
  selector: 'dashboard-author-create-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>
      <h1 class="text-3xl mb-5 flex items-center gap-3">
        <span>Add a new author</span>
      </h1>
      <dashboard-author-create-form
        (create)="onCreate($event)"
      ></dashboard-author-create-form>

      <ui-request-state
        [state]="createRequest$ | async"
        errorText="Could not add new author."
      ></ui-request-state>
    </ng-container>
  `,
  styles: [],
})
export class AuthorCreatePageComponent implements OnDestroy {
  constructor(
    private readonly router: Router,
    public readonly authorService: AuthorService
  ) {}

  public createRequest$?: Observable<RequestState<AuthorContentType>>
  private subscriptions: Subscription[] = []

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
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
