import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'dashboard-primary-button',
  template: ` <p>primary-button works!</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryButtonComponent {}
