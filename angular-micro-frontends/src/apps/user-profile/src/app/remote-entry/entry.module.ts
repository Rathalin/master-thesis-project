import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { RemoteEntryComponent } from './entry.component'
import { remoteRoutes } from './entry.routes'
import { UiModule } from '@angular-micro-frontends/ui'

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes), UiModule],
  providers: [],
})
export class RemoteEntryModule {}
