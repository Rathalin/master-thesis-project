import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { HomePageComponent } from './pages/home/home-page.component'
import { AuthService } from '@angular-micro-frontends/auth'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/login'])
      return false
    }
    return true
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/'])
      return false
    }
    return true
  }
}

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('login/Module').then((m) => m.RemoteEntryModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'user-profile',
    loadChildren: () =>
      import('user-profile/Module').then((m) => m.RemoteEntryModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'register-company',
    loadChildren: () =>
      import('register-company/Module').then((m) => m.RemoteEntryModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'cat-gallery',
    loadChildren: () =>
      import('cat-gallery/Module').then((m) => m.RemoteEntryModule),
    canActivate: [AuthGuard],
  },
]
