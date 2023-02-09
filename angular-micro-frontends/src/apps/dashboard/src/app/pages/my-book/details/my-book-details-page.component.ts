import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'dashboard-my-book-details-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <p>my-book-details-page works!</p> `,
  styles: [],
})
export class MyBookDetailsPageComponent {}
