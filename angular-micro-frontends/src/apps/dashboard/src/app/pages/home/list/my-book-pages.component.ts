import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'dashboard-my-book-pages',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="pages != null" class="flex items-center gap-1">
      <span>{{ pages }}</span>
      <span>Pages</span>
    </div>
  `,
  styles: [],
})
export class MyBookPagesComponent {
  @Input() pages: number | null = null
}
