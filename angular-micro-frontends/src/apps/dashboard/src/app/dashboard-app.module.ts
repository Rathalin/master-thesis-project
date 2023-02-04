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
import { MyBookPageComponent } from './pages/my-book-page/my-book-page.component'
import { PageNotFoundComponent } from './pages/page-not-found.component'
import { MyBookUpdateComponent } from './pages/my-book-page/update/my-book-update.component'
import { ReactiveFormsModule } from '@angular/forms'
import { BookPageComponent } from './pages/book-page/book-page.component'
import { MyBookProgressComponent } from './pages/home-page/my-book-progress.component'
import { MyBookReadingComponent } from './pages/home-page/my-book-reading.component'
import { MyBookReadComponent } from './pages/home-page/my-book-read.component'
import { MyBookNotReadComponent } from './pages/home-page/my-book-not-read.component'
import { MyBookCreateComponent } from './pages/my-book-page/create/my-book-create.component'
import { MyBookCreateFormComponent } from './pages/my-book-page/create/my-book-create-form.component'
import { MyBookUpdateFormComponent } from './pages/my-book-page/update/my-book-update-form.component'

@NgModule({
  declarations: [
    DashboardAppComponent,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    NavLinkComponent,
    MyBookPageComponent,
    PageNotFoundComponent,
    MyBookUpdateComponent,
    BookPageComponent,
    MyBookProgressComponent,
    MyBookReadingComponent,
    MyBookReadComponent,
    MyBookNotReadComponent,
    MyBookCreateComponent,
    MyBookCreateFormComponent,
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
