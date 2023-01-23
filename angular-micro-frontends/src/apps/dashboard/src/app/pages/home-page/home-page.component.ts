import {
  BookOwnershipService,
  BookService,
} from '@angular-micro-frontends/book'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
  template: `
    <main>
      <h1 class="text-3xl">Dashboard</h1>
      <div>
        <ui-reorderable-table></ui-reorderable-table>
      </div>
    </main>
  `,
})
export class HomePageComponent {
  constructor(public bookOwnershipService: BookOwnershipService) {}
}
