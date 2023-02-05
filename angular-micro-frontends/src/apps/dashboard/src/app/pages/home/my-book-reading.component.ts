import { BookOwnershipContentType } from '@angular-micro-frontends/types'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'dashboard-my-book-reading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="myBook != null" class="flex justify-between">
      <div class="flex flex-col">
        <div>
          {{ myBook.attributes.book.data.attributes.title }}
        </div>
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

      <div class="flex flex-col">
        <dashboard-my-book-progress
          [bookOwnership]="myBook"
        ></dashboard-my-book-progress>
      </div>
    </div>
  `,
  styles: [],
})
export class MyBookReadingComponent {
  @Input() myBook: BookOwnershipContentType | null = null
}
