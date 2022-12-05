import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'dashboard-nav-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li>
      <a
        [routerLink]="routerLink"
        class="underline-offset-4"
        [routerLinkActive]="['underline']"
        [routerLinkActiveOptions]="{ exact: true }"
      >
        <ng-content></ng-content>
      </a>
    </li>
  `,
  styles: [],
})
export class NavLinkComponent {
  @Input() routerLink = '#'
}
