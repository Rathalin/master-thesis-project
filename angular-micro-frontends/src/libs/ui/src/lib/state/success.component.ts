import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'ui-success',
  template: `
    <div class="dark:bg-green-600 px-6 py-2 rounded-full">{{ text }}</div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessComponent {
  @Input() text: string = 'Success'
}
