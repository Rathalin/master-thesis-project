import { MyBookContentType } from '@angular-micro-frontends/type-definitions'
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
    <div
      *ngIf="bookOwnership != null && currentPage != null && pages != null"
      class="flex flex-col items-center"
    >
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
      <ui-progress-bar [value]="percent"></ui-progress-bar>
    </div>
  `,
  styles: [],
})
export class MyBookProgressComponent implements OnInit {
  @Input() bookOwnership: MyBookContentType | null = null

  public currentPage: number | null = null
  public pages: number | null = null
  public percent: number = 0

  ngOnInit(): void {
    if (this.bookOwnership != null) {
      this.currentPage = this.bookOwnership.attributes.currentPage
      this.pages = this.bookOwnership.attributes.book.data.attributes.pages
      if (this.currentPage != null && this.pages != null) {
        this.percent = parseFloat(
          ((this.currentPage / this.pages) * 100).toFixed(1)
        )
      }
    }
  }
}
