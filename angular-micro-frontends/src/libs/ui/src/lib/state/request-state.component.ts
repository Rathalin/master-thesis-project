import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'ui-request-state',
  template: ` <p>request-state works!</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestStateComponent {}
