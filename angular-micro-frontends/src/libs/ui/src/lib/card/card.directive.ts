import { Directive, ElementRef } from '@angular/core'
import { applyStyleClasses } from '../util/applyStyleClasses'

@Directive({
  selector: '[uiCard]',
})
export class CardDirective {
  constructor(private el: ElementRef) {
    applyStyleClasses(this.el, this.styleClasses)
  }

  private readonly styleClasses = [
    'px-5',
    'py-1',
    'dark:bg-slate-700',
    'dark:border-slate-600',
    'border',
    'shadow-sm',
    'rounded-md',
  ] as const
}
