import { BookService } from '@angular-micro-frontends/book'
import {
  ContentType,
  MyBookContentType,
  MediaImage,
} from '@angular-micro-frontends/type-definitions'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { Observable, filter, map } from 'rxjs'

@Component({
  selector: 'dashboard-my-book-reading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="myBook != null" class="flex justify-between">
      <div class="flex gap-4">
        <ng-container
          *ngIf="myBook | getMyBookCover as cover; else placeholderCover"
        >
          <img
            [src]="'http://localhost:1337' + cover.formats.thumbnail.url"
            [alt]="cover.name"
            class="w-12"
          />
        </ng-container>
        <ng-template #placeholderCover>
          <ng-container *ngIf="bookCoverPlaceholder$ | async as placeholder">
            <img
              [src]="
                'http://localhost:1337' + placeholder.formats.thumbnail.url
              "
              [alt]="placeholder.formats.thumbnail.url"
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
              let author of myBook.attributes.book.data.attributes.authors.data
            "
          >
            <span class="text-sm dark:text-primary-400">
              {{ author.attributes.firstname }}
              {{ author.attributes.lastname }}
            </span>
          </div>
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
export class MyBookReadingComponent implements OnInit {
  @Input() myBook: MyBookContentType | null = null

  constructor(private readonly bookService: BookService) {}

  public bookCoverPlaceholder$?: Observable<MediaImage>

  ngOnInit(): void {
    this.bookCoverPlaceholder$ = this.bookService
      .getBookCoverPlaceholder()
      .pipe(
        filter(
          (request) =>
            request.isSuccess &&
            request.result!.data != null &&
            request.result!.data.attributes.bookCover.data != null
        ),
        map(
          (request) =>
            request.result!.data!.attributes.bookCover.data!.attributes
        )
      )
  }
}
