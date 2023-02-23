import { BookService } from '@angular-micro-frontends/book'
import {
  BookContentType,
  ImageFile,
} from '@angular-micro-frontends/type-definitions'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { Observable, filter, map } from 'rxjs'

@Component({
  selector: 'dashboard-book-cover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>
      <ng-container
        *ngIf="book | bookCover as cover; else placeholderCoverTemplate"
      >
        <div class="w-12 max-h-20">
          <img
            [src]="'http://localhost:1337' + cover.formats.thumbnail.url"
            [alt]="cover.name"
          />
        </div>
      </ng-container>
      <ng-template #placeholderCoverTemplate>
        <ng-container *ngIf="bookPlaceholderCover$ | async as placeholderCover">
          <div class="w-12 max-h-20">
            <img
              [src]="
                'http://localhost:1337' + placeholderCover.formats.thumbnail.url
              "
              [alt]="placeholderCover.formats.thumbnail.url"
            />
          </div>
        </ng-container>
      </ng-template>
    </ng-container>
  `,
  styles: [],
})
export class BookCoverComponent implements OnInit {
  @Input() book: BookContentType | null = null

  constructor(private readonly bookService: BookService) {}

  public bookPlaceholderCover$?: Observable<ImageFile | null>

  ngOnInit(): void {
    this.bookPlaceholderCover$ = this.bookService
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
