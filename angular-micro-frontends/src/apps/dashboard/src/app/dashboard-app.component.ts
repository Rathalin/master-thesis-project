import { ChangeDetectionStrategy } from '@angular/core'
import { Component } from '@angular/core'

@Component({
  selector: 'dashboard-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dashboard-header></dashboard-header>
    <main class="flex-1 mx-2 mt-10">
      <div class="container mx-auto">
        <router-outlet></router-outlet>
      </div>
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
