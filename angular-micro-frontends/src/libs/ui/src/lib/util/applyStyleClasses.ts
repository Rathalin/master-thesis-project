import { ElementRef } from '@angular/core'

export function applyStyleClasses(
  el: ElementRef,
  styleClasses: readonly string[]
) {
  const nativeElement = el.nativeElement as HTMLElement
  nativeElement.className = [
    ...styleClasses,
    ...nativeElement.className.split(' '),
  ].join(' ')
}
