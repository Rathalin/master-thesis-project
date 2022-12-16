import { Component } from '@angular/core'

@Component({
  selector: 'cat-gallery-root',
  template: '<router-outlet></router-outlet>',
  styles: [
    `
      :host {
        @apply flex-1 flex flex-col;
      }
    `,
  ],
})
export class AppComponent {}
