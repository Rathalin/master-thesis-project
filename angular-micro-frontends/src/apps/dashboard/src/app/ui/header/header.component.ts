import { UserService } from '@angular-micro-frontends/auth'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'dashboard-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="flex justify-center mb-4 px-2 dark:bg-neutral-900 shadow-sm">
      <div class="invisible w-3/12 flex justify-start"></div>
      <nav class="w-6/12 flex justify-center">
        <menu class="flex items-center gap-6 p-3">
          <dashboard-nav-link routerLink="/login">Login</dashboard-nav-link>
          <dashboard-nav-link routerLink="/">Home</dashboard-nav-link>
        </menu>
      </nav>
      <div class="w-3/12 flex justify-end items-center">
        <button type="button" (click)="onLogoutClick()" uiSecondaryButton>
          Logout
        </button>
      </div>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  onLogoutClick() {
    this.userService.logout()
    this.router.navigate(['/login'])
  }
}
