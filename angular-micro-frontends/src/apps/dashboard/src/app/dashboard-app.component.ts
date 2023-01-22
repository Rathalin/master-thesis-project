import { ChangeDetectionStrategy } from '@angular/core'
import { Component } from '@angular/core'

@Component({
  selector: 'dashboard-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dashboard-header></dashboard-header>
    <main class="flex-1">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      :host {
        @apply flex-1 flex flex-col;
      }
    `,
  ],
})
export class DashboardAppComponent {
  title = 'dashboard'
}
