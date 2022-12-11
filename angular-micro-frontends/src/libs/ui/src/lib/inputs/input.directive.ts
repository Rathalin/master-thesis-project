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
    'hover:outline',
    'focus-visible:outline',
    'dark:bg-neutral-700',
    'dark:hover:outline-neutral-500',
    'dark:focus-visible:bg-neutral-600',
    'dark:focus-visible:outline-amber-600',
    'px-3',
    'py-2',
    'rounded-sm',
    'transition-colors',
    'duration-200',
  ] as const
}
