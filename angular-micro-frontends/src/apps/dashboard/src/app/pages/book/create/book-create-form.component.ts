import { AuthorContentType } from '@angular-micro-frontends/type-definitions'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  from,
  map,
  of,
  startWith,
  tap,
} from 'rxjs'

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

        <div>
          <div
            *ngFor="
              let control of this.form.controls.authors.controls;
              index as i
            "
            class="flex gap-2 items-end mb-2"
          >
            <div class="flex-1 flex flex-col">
              <label [for]="'author' + i">Author {{ i + 1 }}</label>
              <select
                [id]="'author' + i"
                [name]="'author' + i"
                [formControl]="control"
                uiInput
              >
                <option
                  *ngFor="let author of authorOptions"
                  class="p-2"
                  [ngValue]="author"
                  [selected]="author.id === selectedAuthor?.id"
                >
                  {{ author.attributes.firstname }}
                  {{ author.attributes.lastname }}
                </option>
              </select>
            </div>
            <button
              (click)="removeAuthorClick(i)"
              type="button"
              class="dark:bg-red-700 dark:hover:bg-red-600 items-center"
              [class]="{ invisible: i === 0 }"
              uiPrimaryButton
            >
              <i class="material-symbols-outlined">delete</i>
            </button>
            <!-- <ui-input-error [controlName]="'author' + i"></ui-input-error> -->
          </div>
        </div>

        <div class="flex justify-between flex-wrap gap-1">
          <button type="button" (click)="addAuthorClick()" uiAccentButton>
            Add another author
          </button>
          <div class="flex  items-center gap-2">
            <div>Author not in the list?</div>
            <a routerLink="/author/new" uiAccentButton>Create</a>
          </div>
        </div>

        <div class="flex flex-col">
          <label for="pages">Pages</label>
          <input
            id="pages"
            name="pages"
            type="number"
            formControlName="pages"
            [min]="1"
            class="dark:bg-primary-700 disabled:hover:bg-primary-700 disabled:hover:outline-none"
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
        <a routerLink="/" uiPrimaryButton>Back</a>
        <button type="submit" uiAccentButton>Add</button>
      </div>
    </form>
  `,
  styles: [],
})
export class BookCreateFormComponent implements OnInit {
  // @Input() set authorOptions(value: AuthorContentType[]) {
  //   this.allAuthorOptions$.next(value)
  // }
  @Input() authorOptions: AuthorContentType[] = []

  constructor(private readonly fb: FormBuilder) {}

  public selectedAuthor: AuthorContentType | null = null
  public readonly form = this.fb.group({
    title: this.fb.nonNullable.control('', [Validators.required]),
    authors: this.fb.nonNullable.array<FormControl<AuthorContentType | null>>(
      [this.fb.control<AuthorContentType | null>(null)],
      [Validators.required]
    ),
    pages: this.fb.control<number | null>(null),
    year: this.fb.control<number | null>(null),
    // cover: this.fb.control<string | null>(null),
  })
  public allAuthorOptions$ = new BehaviorSubject<AuthorContentType[]>([])
  public availableAuthorOptions$?: Observable<AuthorContentType[]>

  ngOnInit(): void {
    this.availableAuthorOptions$ = combineLatest([
      this.allAuthorOptions$,
      this.form.controls.authors.valueChanges.pipe(startWith(null)),
    ]).pipe(
      tap(([authorOptions, selectedAuthors]) =>
        console.log(authorOptions, selectedAuthors)
      ),
      map(([authorOptions, selectedAuthors]) => {
        let selectedAuthorIds: number[] = []
        if (selectedAuthors != null) {
          selectedAuthorIds = selectedAuthors
            .filter((author): author is AuthorContentType => author != null)
            .map((author) => author.id)
        }
        return authorOptions.filter(
          (author) => !selectedAuthorIds.includes(author.id)
        )
      })
    )
  }

  public addAuthorClick() {
    this.form.controls.authors.push(
      this.fb.control<AuthorContentType | null>(null)
    )
  }

  public removeAuthorClick(index: number) {
    this.form.controls.authors.removeAt(index)
  }
}
