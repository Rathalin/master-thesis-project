import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'dashboard-book-page',
  template: ` <p>book-page works!</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookPageComponent {}
