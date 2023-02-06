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
import { Observable, Subscription } from 'rxjs'

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
        [state]="createMutation$ | async"
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

  public createMutation$?: Observable<RequestState<AuthorContentType>>
  private createMutationSubscription?: Subscription

  ngOnDestroy(): void {
    this.createMutationSubscription?.unsubscribe()
  }

  onCreate(author: AuthorAttributes) {
    this.createMutation$ = this.authorService.createAuthor(author)
    this.createMutationSubscription = this.createMutation$.subscribe(() =>
      this.router.navigate(['/'])
    )
  }
}
