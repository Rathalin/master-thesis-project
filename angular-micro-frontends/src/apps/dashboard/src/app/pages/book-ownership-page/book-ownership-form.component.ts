import { BookOwnershipRating, DateString } from '@angular-micro-frontends/book'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'dashboard-book-ownership-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <p>book-ownership-form works!</p> `,
  styles: [],
})
export class BookOwnershipFormComponent {
  constructor(private readonly formBuilder: FormBuilder) {}

  private readonly loginForm = new FormGroup({
    bookId: new FormControl<string | null>(null),
    startDate: new FormControl<DateString | null>(null),
    endDate: new FormControl<DateString | null>(null),
    rating: new FormControl<BookOwnershipRating | null>(null),
    currentPage: new FormControl<number | null>(null),
    note: new FormControl<string | null>(null),
  })

  async onSubmit() {
    if (this.loginForm.invalid) {
      return
    }
    const { bookId, startDate, endDate, rating, currentPage, note } =
      this.loginForm.controls
  }
}
