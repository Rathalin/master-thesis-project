import { AuthorService } from '@angular-micro-frontends/book'
import {
  AuthorContentType,
  RequestState,
} from '@angular-micro-frontends/type-definitions'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Observable, filter, map } from 'rxjs'

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
  constructor(private readonly authorService: AuthorService) {}

  public authorOptionsRequest$?: Observable<RequestState<AuthorContentType[]>>

  ngOnInit(): void {
    this.authorOptionsRequest$ = this.authorService.getAuthors()
  }
}
