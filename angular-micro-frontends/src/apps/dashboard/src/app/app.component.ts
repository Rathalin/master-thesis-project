import { ChangeDetectionStrategy } from '@angular/core'
import { Component } from '@angular/core'

@Component({
  selector: 'dashboard-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dashboard-header></dashboard-header>
    <main class="flex-1">
      <router-outlet></router-outlet>
    </main>
    <dashboard-footer></dashboard-footer>
  `,
  styles: [
    `
      :host {
        @apply flex-1 flex flex-col;
      }
    `,
  ],
})
export class AppComponent {
  title = 'dashboard'
}
