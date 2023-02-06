import { BookOwnershipContentType } from '@angular-micro-frontends/type-definitions'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'dashboard-my-book-not-read',
  template: `
    <div *ngIf="myBook != null">
      <div>
        {{ myBook.attributes.book.data.attributes.title }}
      </div>
      <div class="flex items-center">
        <div
          *ngFor="
            let author of myBook.attributes.book.data.attributes.authors.data
          "
        >
          <span class="text-sm dark:text-gray-400">
            {{ author.attributes.firstname }}
            {{ author.attributes.lastname }}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBookNotReadComponent {
  @Input() myBook: BookOwnershipContentType | null = null
}
