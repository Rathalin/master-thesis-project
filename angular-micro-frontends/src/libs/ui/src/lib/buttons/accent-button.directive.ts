import { Directive, ElementRef } from '@angular/core'
import { applyStyleClasses } from '../util/applyStyleClasses'
import { buttonStyleClasses } from './button-style-classes'

@Directive({
  selector: '[uiAccentButton]',
})
export class AccentButtonDirective {
  constructor(private el: ElementRef) {
    applyStyleClasses(this.el, [...buttonStyleClasses, ...this.styleClasses])
  }

  private readonly styleClasses = [
    'dark:bg-accent-700',
    'dark:hover:bg-accent-600',
  ] as const
}
