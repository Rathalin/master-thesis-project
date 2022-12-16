import { Component } from '@angular/core'

@Component({
  selector: 'cat-gallery-entry',
  template: `
    <div
      class="p-5 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center"
    >
      <cat-gallery-cat-image src="assets/cat11.png"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat9.png"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat10.png"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat6.png"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat1.png"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat2.png"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat3.png"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat4.png"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat5.png"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat7.png"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat8.png"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat12.png"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat13.png"></cat-gallery-cat-image>
      <cat-gallery-cat-image src="assets/cat14.png"></cat-gallery-cat-image>
    </div>
  `,
})
export class RemoteEntryComponent {}
