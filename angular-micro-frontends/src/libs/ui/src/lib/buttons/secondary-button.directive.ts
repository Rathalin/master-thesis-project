import { Directive, ElementRef } from '@angular/core'
import { applyStyleClasses } from '../util/applyStyleClasses'
import { buttonStyleClasses } from './button-style-classes'

@Directive({
  selector: '[uiSecondaryButton]',
})
export class SecondaryButtonDirective {
  constructor(private el: ElementRef) {
    applyStyleClasses(this.el, [...buttonStyleClasses, ...this.styleClasses])
  }

  private readonly styleClasses = [
    'dark:bg-neutral-600',
    'dark:hover:bg-neutral-700',
  ] as const
}
