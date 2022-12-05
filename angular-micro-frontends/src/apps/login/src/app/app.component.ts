import { Component } from '@angular/core'

@Component({
  selector: 'login-root',
  template: ` <router-outlet></router-outlet> `,
  styles: [
    `
      :host {
        @apply flex-1 flex;
      }
    `,
  ],
})
export class AppComponent {}
