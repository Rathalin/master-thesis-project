import { Directive, ElementRef } from '@angular/core'
import { applyStyleClasses } from '../util/applyStyleClasses'

@Directive({
  selector: '[uiInput]',
})
export class InputDirective {
  constructor(private el: ElementRef) {
    applyStyleClasses(this.el, this.styleClasses)
  }

  private readonly styleClasses = [
    'dark:bg-slate-700',
    'hover:outline dark:hover:outline-slate-600',
    'outline-1 focus-visible:outline',
    'dark:focus-visible:bg-slate-500',
    'dark:focus-visible:outline-primary-600',
    'px-3 py-2',
    'rounded-sm',
    'transition-colors duration-200',
  ] as const
}
