import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'ui-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div class="text-blue-600 dark:text-blue-400">Loading...</div> `,
  styles: [],
})
export class LoadingComponent {}
