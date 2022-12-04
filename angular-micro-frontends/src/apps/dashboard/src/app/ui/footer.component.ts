import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'dashboard-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="p-5 flex flex-col items-center">
      <div>Daniel Flockert 2020</div>
    </footer>
  `,
  styles: [],
})
export class FooterComponent {}
