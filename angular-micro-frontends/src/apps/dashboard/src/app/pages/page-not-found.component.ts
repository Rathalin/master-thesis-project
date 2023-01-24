import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'dashboard-page-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <h1 class="text-3xl mb-6">Page not found 😮</h1>
      <a routerLink="/" uiPrimaryButton>Back</a>
    </div>
  `,
  styles: [],
})
export class PageNotFoundComponent {}
