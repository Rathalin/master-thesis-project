import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { RemoteEntryComponent } from './entry.component'
import { remoteRoutes } from './entry.routes'
import { UiModule } from '@angular-micro-frontends/ui'
import { CatImageComponent } from './cat-image.component'

@NgModule({
  declarations: [RemoteEntryComponent, CatImageComponent],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes), UiModule],
  providers: [],
  exports: [CatImageComponent],
})
export class RemoteEntryModule {}
