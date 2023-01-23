import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'ui-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div class="dark:text-blue-600">Loading...</div> `,
  styles: [],
})
export class LoadingComponent {}
