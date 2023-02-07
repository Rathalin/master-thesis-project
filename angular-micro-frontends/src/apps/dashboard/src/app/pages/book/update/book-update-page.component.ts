import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'dashboard-book-update-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>
      <ng-container>
        <h1 class="text-3xl mb-5 flex items-center gap-3 flex-wrap">
          <span>Update Book</span>
        </h1>
      </ng-container>
    </ng-container>
  `,
  styles: [],
})
export class BookUpdatePageComponent {}
