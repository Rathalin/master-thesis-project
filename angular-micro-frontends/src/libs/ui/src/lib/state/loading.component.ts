import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'ui-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dark:bg-secondary-600 px-6 py-2 rounded-full">{{ text }}</div>
  `,
  styles: [],
})
export class LoadingComponent {
  @Input() text: string = 'Loading...'
}
