import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { AuthService } from '@angular-micro-frontends/auth'
import { MyBookPageComponent } from './pages/my-book-page/my-book-page.component'
import { PageNotFoundComponent } from './pages/page-not-found.component'

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
    path: 'my-book/new',
    component: MyBookPageComponent,
    canActivate: [AuthGuard],
    data: {
      mode: 'create',
    },
  },
  {
    path: 'my-book/:id',
    component: MyBookPageComponent,
    canActivate: [AuthGuard],
    data: {
      mode: 'edit',
    },
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
    path: '**',
    component: PageNotFoundComponent,
    canActivate: [AuthGuard],
  },
]
