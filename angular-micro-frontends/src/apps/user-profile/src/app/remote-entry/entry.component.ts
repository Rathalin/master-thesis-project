import { AuthService } from '@angular-micro-frontends/auth'
import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'angular-micro-frontends-user-profile-entry',
  template: `
    <ng-container>
      <div *ngIf="authService.auth$ | async as auth; else noUser">
        <h1>Welcome {{ auth.user.username }}</h1>
        <div>Email: {{ auth.user.email }}</div>
        <article class="mt-4">
          <h2 class="text-2xl mb-2 block">Change Username</h2>
          <div class="flex items-end gap-2">
            <form class="block" [formGroup]="form">
              <label for="newUsername">New Username</label>
              <input
                id="newUsername"
                name="newUsername"
                formControlName="newUsername"
                class="block"
                type="text"
                formControlName="newUsername"
                uiInput
              />
            </form>
            <button
              type="button"
              (click)="onChangeUsernameClick()"
              uiAccentButton
            >
              Confirm
            </button>
          </div>
        </article>
      </div>
      <ng-template #noUser>
        <h1>No user. This page should not be visible without login.</h1>
      </ng-template>
    </ng-container>
  `,
})
export class RemoteEntryComponent {
  constructor(public authService: AuthService) {}

  public form = new FormGroup({
    newUsername: new FormControl(''),
  })

  onChangeUsernameClick() {
    if (this.authService.currentUser == null)
      throw new Error('No user in auth service.')
    this.authService.setCurrentUserData({
      ...this.authService.currentUser,
      username: this.form.controls.newUsername.value ?? '',
      updatedAt: new Date().toDateString(),
    })
    console.log('Changed username to: ' + this.form.controls.newUsername.value)
    console.log(this.authService.currentUser)
  }
}
