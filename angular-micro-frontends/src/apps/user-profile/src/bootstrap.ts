import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { UserProfileAppModule } from './app/user-profile-app.module'

platformBrowserDynamic()
  .bootstrapModule(UserProfileAppModule)
  .catch((err) => console.error(err))
