import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'dashboard-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="flex justify-center mb-4 dark:bg-neutral-900 shadow-sm">
      <nav>
        <menu class="flex items-center gap-6 p-3">
          <dashboard-nav-link routerLink="/login">Login</dashboard-nav-link>
          <dashboard-nav-link routerLink="/">Home</dashboard-nav-link>
        </menu>
      </nav>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {}
