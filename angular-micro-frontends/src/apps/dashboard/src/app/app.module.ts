import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'
import { appRoutes } from './app.routes'
import { HomePageComponent } from './pages/home/home-page.component'
import { FooterComponent } from './ui/footer.component'
import { HeaderComponent } from './ui/header.component'
import { PrimaryButtonComponent } from './ui/buttons/primary-button.component'

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    PrimaryButtonComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
