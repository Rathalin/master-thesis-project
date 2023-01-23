import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'ui-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div class="text-red-600 dark:text-red-400">{{ text }}</div> `,
  styles: [],
})
export class ErrorComponent {
  @Input() text: string = 'Error'
}
