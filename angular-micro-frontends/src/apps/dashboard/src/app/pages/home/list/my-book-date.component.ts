import { DateString } from '@angular-micro-frontends/type-definitions'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'dashboard-my-book-date',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="date != null" class="flex items-center gap-1">
      <span>{{ date | date }}</span>
      <i class="material-symbols-outlined">check_circle</i>
    </div>
  `,
  styles: [],
})
export class MyBookDateComponent {
  @Input() date: DateString | null = null
}
