import { ChangeDetectionStrategy, Component } from '@angular/core'
import { interval, map, startWith, tap } from 'rxjs'

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
  template: `
    <div class="flex flex-col items-center">
      <img
        src="../../../assets/cute_cat.jpg"
        alt="White baby cat"
        class="max-w-sm rounded-sm shadow-md"
        loading="eager"
      />
      <div class="mt-4 flex gap-2">
        <ui-secondary-button>Click me!</ui-secondary-button>
        <ui-primary-button>Click me aswell!</ui-primary-button>
      </div>
    </div>
  `,
})
export class HomePageComponent {}
