import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'ui-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div class="dark:text-red-600">{{ text }}</div> `,
  styles: [],
})
export class ErrorComponent {
  @Input() text: string = 'Error'
}
