import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  RouterStateSnapshot,
} from '@angular/router'
import { HomePageComponent } from './pages/home/home-page.component'
import { UserService } from '@angular-micro-frontends/auth'

@Injectable()
class canActivateProtectedRoutes implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    return this.userService.isUserLoggedIn
  }
}

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [canActivateProtectedRoutes],
  },
  {
    path: 'login',
    loadChildren: () => import('login/Module').then((m) => m.RemoteEntryModule),
  },
]
