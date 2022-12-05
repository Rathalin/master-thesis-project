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
    'px-3',
    'py-2',
    'dark:bg-neutral-700',
    'dark:focus-visible:bg-neutral-600',
    'outline-1',
    'hover:outline',
    'focus-visible:outline',
    'dark:hover:outline-amber-600',
    'dark:focus-visible:outline-neutral-500',
    'rounded-sm',
    'transition-colors',
    'duration-200',
  ] as const
}
