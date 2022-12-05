import { Component } from '@angular/core'

@Component({
  selector: 'login-entry',
  template: `<login-home-page></login-home-page>`,
  styles: [
    `
      :host {
        @apply flex-1 flex flex-col;
      }
    `,
  ],
})
export class RemoteEntryComponent {}
