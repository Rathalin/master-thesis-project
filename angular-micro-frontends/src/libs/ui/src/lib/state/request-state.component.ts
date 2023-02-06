import { RequestState } from '@angular-micro-frontends/type-definitions'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'ui-request-state',
  template: `
    <ng-container *ngIf="state != null">
      <ui-loading *ngIf="state.isLoading" [text]="loadingText"></ui-loading>
      <ui-success *ngIf="state.isSuccess" [text]="successText"></ui-success>
      <ui-error *ngIf="state.isError" [text]="errorText"></ui-error>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestStateComponent {
  @Input() state: RequestState<unknown> | null = null
  @Input() loadingText = 'Loading'
  @Input() successText = 'Success'
  @Input() errorText = 'Error'
}
