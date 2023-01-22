import { AuthService } from '@angular-micro-frontends/auth'
import { Component } from '@angular/core'

@Component({
  selector: 'angular-micro-frontends-user-profile-entry',
  template: `
    <ng-container>
      <div *ngIf="authService.auth$ | async as auth; else noUser">
        <h1>Welcome {{ auth.user.username }}</h1>
        <div>Email: {{ auth.user.email }}</div>
      </div>
      <ng-template #noUser>
        <h1>No user. This page should not be visible without login.</h1>
      </ng-template>
    </ng-container>
  `,
})
export class RemoteEntryComponent {
  constructor(public authService: AuthService) {}
}
