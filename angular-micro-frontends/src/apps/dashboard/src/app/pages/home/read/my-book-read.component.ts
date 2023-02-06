import { MyBookContentType } from '@angular-micro-frontends/type-definitions'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'dashboard-my-book-read',
  template: `
    <ng-container *ngIf="myBook != null">
      <div>
        {{ myBook.attributes.book.data.attributes.title }}
      </div>
      <div class="flex items-center">
        <div
          *ngFor="
            let author of myBook.attributes.book.data.attributes.authors.data
          "
        >
          <span class="text-sm dark:text-primary-400">
            {{ author.attributes.firstname }}
            {{ author.attributes.lastname }}
          </span>
        </div>
      </div>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBookReadComponent {
  @Input() myBook: MyBookContentType | null = null
}
