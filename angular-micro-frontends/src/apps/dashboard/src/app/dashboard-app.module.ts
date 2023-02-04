import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { DashboardAppComponent } from './dashboard-app.component'
import { RouterModule } from '@angular/router'
import { appRoutes, AuthGuard, LoginGuard } from './dashboard-app.routes'
import { HomePageComponent } from './pages/home/home-page.component'
import { FooterComponent } from './ui/footer.component'
import { HeaderComponent } from './ui/header/header.component'
import { NavLinkComponent } from './ui/header/nav-link.component'
import { UiModule } from '@angular-micro-frontends/ui'
import { PageNotFoundComponent } from './pages/error/page-not-found-page.component'
import { ReactiveFormsModule } from '@angular/forms'
import { BookPageComponent } from './pages/book/book-page.component'
import { MyBookProgressComponent } from './pages/home/my-book-progress.component'
import { MyBookReadingComponent } from './pages/home/my-book-reading.component'
import { MyBookReadComponent } from './pages/home/my-book-read.component'
import { MyBookNotReadComponent } from './pages/home/my-book-not-read.component'
import { MyBookCreateFormComponent } from './pages/my-book/create/my-book-create-form.component'
import { MyBookCreatePageComponent } from './pages/my-book/create/my-book-create-page.component'
import { MyBookUpdateFormComponent } from './pages/my-book/update/my-book-update-form.component'
import { MyBookUpdatePageComponent } from './pages/my-book/update/my-book-update-page.component'

@NgModule({
  declarations: [
    DashboardAppComponent,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    NavLinkComponent,
    PageNotFoundComponent,
    BookPageComponent,
    MyBookProgressComponent,
    MyBookReadingComponent,
    MyBookReadComponent,
    MyBookNotReadComponent,
    MyBookCreatePageComponent,
    MyBookCreateFormComponent,
    MyBookUpdatePageComponent,
    MyBookUpdateFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    UiModule,
  ],
  providers: [AuthGuard, LoginGuard],
  bootstrap: [DashboardAppComponent],
})
export class DashboardAppModule {}
