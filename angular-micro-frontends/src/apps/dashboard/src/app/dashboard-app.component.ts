import { ChangeDetectionStrategy } from '@angular/core'
import { Component } from '@angular/core'

@Component({
  selector: 'dashboard-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dashboard-header></dashboard-header>
    <main class="flex-1 mx-2 mt-4 sm:mt-10">
      <div class="max-w-2xl mx-auto overflow-auto">
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
