import { BookOwnershipContentType } from '@angular-micro-frontends/book'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'

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
      <progress
        class="h-1 w-24"
        [value]="currentPage"
        [max]="pages"
        [title]="(percent | number : '1.2-2') + '%'"
      >
        {{ this.percent | number : '1.2-2' }}%
      </progress>
    </div>
  `,
  styles: [],
})
export class MyBookProgressComponent implements OnInit {
  @Input() bookOwnership: BookOwnershipContentType | null = null

  public currentPage = 0
  public pages = 1
  public percent = 0

  ngOnInit(): void {
    if (this.bookOwnership != null) {
      this.currentPage = this.bookOwnership.attributes.currentPage ?? 0
      this.pages = this.bookOwnership.attributes.book.data.attributes.pages ?? 1
      this.percent = (this.currentPage / this.pages) * 100
    }
  }
}
