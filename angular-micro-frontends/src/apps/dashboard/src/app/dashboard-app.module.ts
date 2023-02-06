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
import { MyBookProgressComponent } from './pages/home/reading/my-book-progress.component'
import { MyBookReadComponent } from './pages/home/read/my-book-read.component'
import { MyBookNotReadComponent } from './pages/home/not-read/my-book-not-read.component'
import { MyBookCreateFormComponent } from './pages/my-book/create/my-book-create-form.component'
import { MyBookCreatePageComponent } from './pages/my-book/create/my-book-create-page.component'
import { MyBookUpdateFormComponent } from './pages/my-book/update/my-book-update-form.component'
import { MyBookUpdatePageComponent } from './pages/my-book/update/my-book-update-page.component'
import { BookTitlePipe } from './pages/my-book/create/book-title.pipe'
import { BookCreateFormComponent } from './pages/book/create/book-create-form.component'
import { AuthorUpdateFormComponent } from './pages/author/update/author-update-form.component'
import { AuthorCreateFormComponent } from './pages/author/create/author-create-form.component'
import { AuthorCreatePageComponent } from './pages/author/create/author-create-page.component'
import { BookCreatePageComponent } from './pages/book/create/book-create-page.component'
import { MyBookReadingComponent } from './pages/home/reading/my-book-reading.component'
import { AuthorUpdatePageComponent } from './pages/author/update/author-update-page.component'
import { BookUpdatePageComponent } from './pages/book/update/book-update-page.component'
import { BookUpdateFormComponent } from './pages/book/update/book-update-form.component'

@NgModule({
  declarations: [
    DashboardAppComponent,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    NavLinkComponent,
    PageNotFoundComponent,
    BookCreatePageComponent,
    MyBookProgressComponent,
    MyBookReadingComponent,
    MyBookReadComponent,
    MyBookNotReadComponent,
    MyBookCreatePageComponent,
    MyBookCreateFormComponent,
    MyBookUpdatePageComponent,
    MyBookUpdateFormComponent,
    BookTitlePipe,
    BookCreateFormComponent,
    AuthorCreatePageComponent,
    AuthorUpdatePageComponent,
    AuthorUpdateFormComponent,
    AuthorCreateFormComponent,
    BookUpdatePageComponent,
    BookUpdateFormComponent,
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
