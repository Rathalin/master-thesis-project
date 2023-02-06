import { AuthorContentType } from '@angular-micro-frontends/type-definitions'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'dashboard-book-create-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form">
      <div class="flex flex-col gap-y-2">
        <div class="flex flex-col">
          <label for="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            formControlName="title"
            uiInput
          />
          <ui-input-error controlName="title"></ui-input-error>
        </div>

        <div class="flex flex-col">
          <label for="author">Author</label>
          <select id="author" name="author" formControlName="author" uiInput>
            <option
              *ngFor="let author of authorOptions"
              class="p-2"
              [ngValue]="author"
              [selected]="author.id === form.controls.author.value?.id"
            >
              {{ author.attributes.firstname }} {{ author.attributes.lastname }}
            </option>
          </select>
          <ui-input-error controlName="book"></ui-input-error>
        </div>

        <div class="flex items-center gap-2">
          <div>Author not in the list?</div>
          <a routerLink="/author/new" uiPrimaryButton>Add</a>
        </div>

        <div class="flex flex-col">
          <label for="pages">Pages</label>
          <input
            id="pages"
            name="pages"
            type="number"
            formControlName="pages"
            [min]="1"
            class="dark:bg-slate-700 disabled:hover:bg-slate-700 disabled:hover:outline-none"
            uiInput
          />
          <ui-input-error controlName="pages"></ui-input-error>
        </div>

        <div class="flex flex-col">
          <label for="year">Release year</label>
          <input
            id="year"
            name="year"
            type="date"
            formControlName="year"
            uiInput
          />
          <ui-input-error controlName="year"></ui-input-error>
        </div>

        <!-- <div class="flex flex-col">
          <label for="cover">Upload a cover</label>
          <input
            id="cover"
            name="cover"
            type="file"
            formControlName="cover"
            uiInput
          />
          <ui-input-error controlName="cover"></ui-input-error>
        </div> -->
      </div>
      <div class="mt-4 flex items-center justify-center gap-3">
        <a routerLink="/" uiSecondaryButton>Back</a>
        <button type="submit" uiPrimaryButton>Add</button>
      </div>
    </form>
  `,
  styles: [],
})
export class BookCreateFormComponent {
  @Input() authorOptions: AuthorContentType[] = []

  public readonly form = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    author: new FormControl<AuthorContentType | null>(null, [
      Validators.required,
    ]),
    pages: new FormControl<number | null>(null),
    year: new FormControl<number | null>(null),
    // cover: new FormControl<string | null>(null),
  })
}
