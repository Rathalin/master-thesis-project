import { Route } from '@angular/router'
import { HomePageComponent } from './pages/home/home-page.component'

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: () => import('login/Module').then((m) => m.RemoteEntryModule),
  },
  {
    path: '',
    component: HomePageComponent,
  },
]
