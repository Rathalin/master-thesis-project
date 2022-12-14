import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { HomePageComponent } from './pages/home/home-page.component'
import { UserService } from '@angular-micro-frontends/auth'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    if (!this.userService.isUserLoggedIn) {
      this.router.navigate(['/login'])
      console.log('redirect to login')
      return false
    }
    return true
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    if (this.userService.isUserLoggedIn) {
      this.router.navigate(['/'])
      console.log('redirect to /')
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
]
