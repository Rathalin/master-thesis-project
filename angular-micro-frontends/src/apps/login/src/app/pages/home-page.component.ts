import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'login-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="flex-1 flex flex-col items-center justify-center">
      <div>Test</div>
    </main>
  `,
  styles: [],
})
export class HomePageComponent {}
