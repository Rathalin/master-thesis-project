import { Component } from '@angular/core'

@Component({
  selector: 'cat-gallery-entry',
  template: `
    <div
      class="p-5 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center"
    >
      <cat-gallery-cat-image src="assets/cat11.jpg"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat9.jpg"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat10.jpg"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat6.jpg"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat1.jpg"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat2.jpg"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat3.jpg"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat4.jpg"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat5.jpg"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat7.jpg"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat8.jpg"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat12.jpg"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat13.jpg"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat14.jpg"></cat-gallery-cat-image>
    </div>
  `,
})
export class RemoteEntryComponent {}
