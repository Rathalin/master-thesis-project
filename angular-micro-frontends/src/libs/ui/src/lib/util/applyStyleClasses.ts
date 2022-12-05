import { ElementRef } from '@angular/core'

export function applyStyleClasses(
  el: ElementRef,
  styleClasses: readonly string[]
) {
  const initialStyleClasses = el.nativeElement.className.split(' ')
  el.nativeElement.className = [...initialStyleClasses, ...styleClasses].join(
    ' '
  )
}
