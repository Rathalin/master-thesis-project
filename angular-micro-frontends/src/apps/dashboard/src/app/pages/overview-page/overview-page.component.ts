import { ChangeDetectionStrategy, Component } from '@angular/core'
import { BehaviorSubject, of } from 'rxjs'

@Component({
  selector: 'dashboard-overview-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>
      <h1>Overview</h1>
      <div></div>
    </ng-container>
  `,
  styles: [],
})
export class OverviewPageComponent {
  private bookOwnershipSubject = new BehaviorSubject<{}[]>([])
  bookOwnership$ = this.bookOwnershipSubject.asObservable()
}
