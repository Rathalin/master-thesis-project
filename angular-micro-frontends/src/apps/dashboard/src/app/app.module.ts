import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'
import { appRoutes, AuthGuard, LoginGuard } from './app.routes'
import { HomePageComponent } from './pages/home/home-page.component'
import { FooterComponent } from './ui/footer.component'
import { HeaderComponent } from './ui/header/header.component'
import { NavLinkComponent } from './ui/header/nav-link.component'
import { UiModule } from '@angular-micro-frontends/ui'

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    NavLinkComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    UiModule,
  ],
  providers: [AuthGuard, LoginGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
