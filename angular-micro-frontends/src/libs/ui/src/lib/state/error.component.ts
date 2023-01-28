import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'ui-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dark:bg-red-600 px-6 py-2 rounded-full">{{ text }}</div>
  `,
  styles: [],
})
export class ErrorComponent {
  @Input() text: string = 'Error'
}
