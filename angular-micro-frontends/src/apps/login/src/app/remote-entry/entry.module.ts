import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { RemoteEntryComponent } from './entry.component'
import { remoteRoutes } from './entry.routes'
import { UiModule } from '@angular-micro-frontends/ui'
import { ReactiveFormsModule } from '@angular/forms'
import { LoginFormComponent } from './login-form.component'

@NgModule({
  declarations: [RemoteEntryComponent, LoginFormComponent],
  providers: [],
  imports: [
    CommonModule,
    RouterModule.forChild(remoteRoutes),
    UiModule,
    ReactiveFormsModule,
  ],
  exports: [LoginFormComponent],
})
export class RemoteEntryModule {}
