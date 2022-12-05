import { AfterViewInit, Directive, ElementRef } from '@angular/core'
import { applyStyleClasses } from '../util/applyStyleClasses'
import { buttonStyleClasses } from './button-style-classes'

@Directive({
  selector: '[uiPrimaryButton]',
})
export class PrimaryButtonDirective {
  constructor(private el: ElementRef) {
    applyStyleClasses(this.el, [...buttonStyleClasses, ...this.styleClasses])
  }

  private readonly styleClasses = [
    'dark:bg-amber-700',
    'dark:hover:bg-amber-600',
  ] as const
}
