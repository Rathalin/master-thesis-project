import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { LoginAppModule } from './app/login-app.module'

platformBrowserDynamic()
  .bootstrapModule(LoginAppModule)
  .catch((err) => console.error(err))
