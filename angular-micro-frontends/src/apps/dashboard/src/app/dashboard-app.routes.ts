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
import { PageNotFoundComponent } from './pages/error/page-not-found-page.component'
import { MyBookCreatePageComponent } from './pages/my-book/create/my-book-create-page.component'
import { MyBookUpdatePageComponent } from './pages/my-book/update/my-book-update-page.component'
import { BookCreatePageComponent } from './pages/book/create/book-create-page.component'
import { BookUpdatePageComponent } from './pages/book/update/book-update-page.component'
import { AuthorCreatePageComponent } from './pages/author/create/author-create-page.component'
import { AuthorUpdatePageComponent } from './pages/author/update/author-update-page.component'

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
    path: 'author/new',
    component: AuthorCreatePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'author/:id',
    component: AuthorUpdatePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'book/new',
    component: BookCreatePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'book/:id',
    component: BookUpdatePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-book/new',
    component: MyBookCreatePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-book/:id',
    component: MyBookUpdatePageComponent,
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
    path: '**',
    component: PageNotFoundComponent,
    canActivate: [AuthGuard],
  },
]
