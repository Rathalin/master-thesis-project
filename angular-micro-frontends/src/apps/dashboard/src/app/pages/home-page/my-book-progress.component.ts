import { BookOwnershipContentType } from '@angular-micro-frontends/book'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'dashboard-my-book-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="bookOwnership != null" class="flex flex-col items-center">
      <div>
        <span>Page {{ bookOwnership.attributes.currentPage }}</span>
        <ng-container
          *ngIf="bookOwnership.attributes.book.data.attributes.pages != null"
        >
          <span
            >/{{ bookOwnership.attributes.book.data.attributes.pages }}
          </span>
        </ng-container>
      </div>
      <progress max="100" value="70">70%</progress>
    </div>
  `,
  styles: [],
})
export class MyBookProgressComponent {
  @Input() bookOwnership: BookOwnershipContentType | null = null
}
