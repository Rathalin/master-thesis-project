import { RequestState } from '@angular-micro-frontends/type-definitions'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'ui-request-state',
  template: `
    <ng-container *ngIf="state != null">
      <ui-loading
        *ngIf="!hideLoading && state.isLoading"
        [text]="loadingText"
      ></ui-loading>
      <ui-success
        *ngIf="!hideSuccess && state.isSuccess"
        [text]="successText"
      ></ui-success>
      <ui-error
        *ngIf="!hideError && state.isError"
        [text]="errorText"
      ></ui-error>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestStateComponent {
  @Input() state: RequestState<unknown> | null = null
  @Input() loadingText = 'Loading'
  @Input() hideLoading = false
  @Input() successText = 'Success'
  @Input() hideSuccess = false
  @Input() errorText = 'Error'
  @Input() hideError = false
}
