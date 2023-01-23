import { BookService } from '@angular-micro-frontends/book'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
  template: `
    <div class="flex flex-col items-center mt-10">
      <div class="mt-4 flex gap-2">Test</div>
    </div>
  `,
})
export class HomePageComponent {
  // constructor(public bookService: BookService) {}
}
