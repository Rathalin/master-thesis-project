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
    'outline-1',
    'hover:outline disabled:hover:outline-none',
    'focus-visible:outline',
    'dark:bg-slate-700',
    'dark:hover:outline-slate-500',
    'dark:focus-visible:bg-slate-600 disabled:dark:focus-visible:bg-slate-700',
    'dark:focus-visible:outline-primary-600 disabled:dark:focus-visible:outline-none',
    'px-3',
    'py-2',
    'rounded-sm',
    'transition-colors',
    'duration-200',
  ] as const
}
