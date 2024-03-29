import { AuthService } from '@angular-micro-frontends/auth'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'dashboard-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      *ngIf="authService.isAuthenticated$ | async"
      class="flex justify-center p-1 dark:bg-neutral-900 shadow-sm"
    >
      <nav class="w-6/12 flex justify-start">
        <menu class="flex items-center gap-6 p-3">
          <dashboard-nav-link routerLink="/">Home</dashboard-nav-link>
          <dashboard-nav-link routerLink="/user-profile">
            Profile
          </dashboard-nav-link>
        </menu>
      </nav>
      <div class="w-6/12 flex justify-end items-center gap-2">
        <ng-container *ngIf="authService.currentUser$ | async as user">
          <div>{{ user.username }}</div>
        </ng-container>
        <button type="button" (click)="onLogoutClick()" uiPrimaryButton>
          Logout
        </button>
      </div>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {
  constructor(
    public readonly authService: AuthService,
    private readonly router: Router
  ) {}

  onLogoutClick() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
