import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'ui-primary-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button class="dark:bg-amber-600 dark:hover:bg-amber-700">
      <ng-content></ng-content>
    </button>
  `,
  styles: [],
  styleUrls: ['./button.css'],
})
export class PrimaryButtonComponent {}
