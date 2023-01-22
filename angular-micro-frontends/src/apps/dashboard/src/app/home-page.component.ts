import { BookService } from '@angular-micro-frontends/book'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
  template: `
    <div class="flex flex-col items-center mt-10">
      <h1 class="text-3xl mb-4">Book Tracking App</h1>
      <ng-container *ngIf="bookService.books$ | async as books; else loading">
        <ul>
          <li *ngFor="let book of books.data">
            <div>{{ book.attributes.title }}</div>
          </li>
        </ul>
      </ng-container>
      <ng-template #loading>Loading...</ng-template>
      <div class="mt-4 flex gap-2"></div>
    </div>
  `,
})
export class HomePageComponent {
  constructor(public bookService: BookService) {
    this.bookService.fetchBooks()
  }
}
