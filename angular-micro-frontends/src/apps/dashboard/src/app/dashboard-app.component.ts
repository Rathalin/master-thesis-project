import { ChangeDetectionStrategy } from '@angular/core'
import { Component } from '@angular/core'

@Component({
  selector: 'dashboard-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dashboard-header></dashboard-header>
    <main class="mx-2 mt-4 sm:mt-10">
      <div class="max-w-2xl mx-auto mb-2">
        <router-outlet></router-outlet>
      </div>
    </main>
  `,
  styles: [],
})
export class DashboardAppComponent {
  title = 'dashboard'
}
