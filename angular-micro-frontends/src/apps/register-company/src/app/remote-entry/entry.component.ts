import { Component } from '@angular/core'

@Component({
  selector: 'register-company-entry',
  template: `
    <div class="container mx-auto mt-10">
      <div class="mx-auto w-full xl:w-1/2">
        <h1 class="text-3xl">Register your company</h1>
        <register-company-main-form></register-company-main-form>
      </div>
    </div>
  `,
})
export class RemoteEntryComponent {}
