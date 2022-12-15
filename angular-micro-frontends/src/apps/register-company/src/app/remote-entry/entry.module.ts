import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { RemoteEntryComponent } from './entry.component'
import { remoteRoutes } from './entry.routes'
import { MainFormComponent } from './main-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { UiModule } from '@angular-micro-frontends/ui'

@NgModule({
  declarations: [RemoteEntryComponent, MainFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(remoteRoutes),
    ReactiveFormsModule,
    UiModule,
  ],
  providers: [],
  exports: [MainFormComponent],
})
export class RemoteEntryModule {}
