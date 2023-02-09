import {
  ImageFile,
  MyBookContentType,
} from '@angular-micro-frontends/type-definitions'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'dashboard-my-book-list-entry',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="myBook != null">
      <a
        [id]="'my-book-' + myBook.id"
        [routerLink]="['/my-book', myBook.id]"
        class="dark:hover:bg-primary-600 px-3 py-4 cursor-pointer transition-colors duration-100 block"
      >
        <div class="flex flex-wrap justify-between mx-2 gap-y-2">
          <div class="flex gap-4">
            <ng-container
              *ngIf="
                myBook | getMyBookCover as cover;
                else placeholderCoverTemplate
              "
            >
              <div class="w-12 max-h-20">
                <img
                  [src]="'http://localhost:1337' + cover.formats.thumbnail.url"
                  [alt]="cover.name"
                />
              </div>
            </ng-container>
            <ng-template #placeholderCoverTemplate>
              <ng-container *ngIf="placeholderCover != null">
                <div class="w-12 max-h-20">
                  <img
                    [src]="
                      'http://localhost:1337' +
                      placeholderCover.formats.thumbnail.url
                    "
                    [alt]="placeholderCover.formats.thumbnail.url"
                  />
                </div>
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

          <div *ngIf="showPages">
            <dashboard-my-book-pages
              [pages]="myBook.attributes.book.data.attributes.pages"
            ></dashboard-my-book-pages>
          </div>

          <div *ngIf="showReadDate">
            <dashboard-my-book-date
              [date]="myBook.attributes.finishReading"
            ></dashboard-my-book-date>
          </div>

          <div *ngIf="showProgress" class="flex flex-col">
            <dashboard-my-book-progress
              [bookOwnership]="myBook"
            ></dashboard-my-book-progress>
          </div>
        </div>
      </a>
    </ng-container>
  `,
  styles: [
    `
      :host {
        border-radius: inherit;
      }

      :host > a {
        border-radius: inherit;
      }
    `,
  ],
})
export class MyBookListEntryComponent {
  @Input() myBook: MyBookContentType | null = null
  @Input() placeholderCover: ImageFile | null = null
  @Input() showProgress = false
  @Input() showPages = false
  @Input() showReadDate = false
}
