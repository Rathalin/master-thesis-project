import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'ui-reorderable-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ul></ul> `,
  styles: [],
})
export class ReorderableTableComponent {}
