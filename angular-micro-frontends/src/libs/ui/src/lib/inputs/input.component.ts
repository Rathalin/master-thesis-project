import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'ui-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <p>input works!</p> `,
  styles: [],
})
export class InputComponent {}
