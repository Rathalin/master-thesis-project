import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'ui-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="dark:bg-accent-200 inline-block h-1 min-w-[100px]">
      <span
        class="dark:bg-accent-600 block h-full"
        [style.width]="(percent | async) + '%'"
      ></span>
    </span>
  `,
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
})
export class ProgressBarComponent {
  @Input() set value(newValue: number) {
    this.calculatePercent(newValue)
  }
  @Input() max = 100

  private calculatePercent(newValue: number) {
    this.percent.next(Math.min((newValue / this.max) * this.max, 100))
  }

  public percent = new BehaviorSubject(20)
}
