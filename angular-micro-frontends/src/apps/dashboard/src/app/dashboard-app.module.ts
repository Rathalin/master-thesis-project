import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { DashboardAppComponent } from './dashboard-app.component'
import { RouterModule } from '@angular/router'
import { appRoutes, AuthGuard, LoginGuard } from './dashboard-app.routes'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { FooterComponent } from './ui/footer.component'
import { HeaderComponent } from './ui/header/header.component'
import { NavLinkComponent } from './ui/header/nav-link.component'
import { UiModule } from '@angular-micro-frontends/ui'
import { BookOwnershipPageComponent } from './pages/book-ownership-page/book-ownership-page.component'
import { PageNotFoundComponent } from './pages/page-not-found.component'
import { BookOwnershipFormComponent } from './pages/book-ownership-page/book-ownership-form.component'

@NgModule({
  declarations: [
    DashboardAppComponent,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    NavLinkComponent,
    BookOwnershipPageComponent,
    PageNotFoundComponent,
    BookOwnershipFormComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    UiModule,
  ],
  providers: [AuthGuard, LoginGuard],
  bootstrap: [DashboardAppComponent],
})
export class DashboardAppModule {}
