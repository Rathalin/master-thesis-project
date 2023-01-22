import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { DashboardAppModule } from './app/dashboard-app.module'

platformBrowserDynamic()
  .bootstrapModule(DashboardAppModule)
  .catch((err) => console.error(err))
