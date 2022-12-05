import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'ui-secondary-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button class="dark:bg-neutral-600 dark:hover:bg-neutral-700">
      <ng-content></ng-content>
    </button>
  `,
  styles: [],
  styleUrls: ['./button.css'],
})
export class SecondaryButtonComponent {}
