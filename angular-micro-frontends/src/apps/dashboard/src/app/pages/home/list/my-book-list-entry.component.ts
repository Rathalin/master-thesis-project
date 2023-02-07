import {
  ImageFile,
  MyBookContentType,
} from '@angular-micro-frontends/type-definitions'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'dashboard-my-book-list-entry',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngIf="myBook != null"
      [routerLink]="['/my-book', myBook.id]"
      class="dark:hover:bg-primary-600 px-3 py-4 cursor-pointer transition-colors duration-100"
    >
      <div class="flex justify-between mx-2">
        <div class="flex gap-4">
          <ng-container
            *ngIf="
              myBook | getMyBookCover as cover;
              else placeholderCoverTemplate
            "
          >
            <img
              [src]="'http://localhost:1337' + cover.formats.thumbnail.url"
              [alt]="cover.name"
              class="w-12"
            />
          </ng-container>
          <ng-template #placeholderCoverTemplate>
            <ng-container *ngIf="placeholderCover != null">
              <img
                [src]="
                  'http://localhost:1337' +
                  placeholderCover.formats.thumbnail.url
                "
                [alt]="placeholderCover.formats.thumbnail.url"
                class="w-12"
              />
            </ng-container>
          </ng-template>
          <div class="flex flex-col">
            <div>
              {{ myBook.attributes.book.data.attributes.title }}
            </div>
            <div
              *ngFor="
                let author of myBook.attributes.book.data.attributes.authors
                  .data
              "
            >
              <span class="text-sm dark:text-primary-400">
                {{ author.attributes.firstname }}
                {{ author.attributes.lastname }}
              </span>
            </div>
          </div>
        </div>

        <div *ngIf="showProgress" class="flex flex-col">
          <dashboard-my-book-progress
            [bookOwnership]="myBook"
          ></dashboard-my-book-progress>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        border-radius: inherit;
      }

      :host > div {
        border-radius: inherit;
      }
    `,
  ],
})
export class MyBookListEntryComponent {
  @Input() myBook: MyBookContentType | null = null
  @Input() placeholderCover: ImageFile | null = null
  @Input() showProgress = false
}
