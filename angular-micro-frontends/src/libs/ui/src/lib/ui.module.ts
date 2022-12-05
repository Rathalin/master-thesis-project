import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PrimaryButtonComponent } from './buttons/primary-button.component'
import { SecondaryButtonComponent } from './buttons/secondary-button.component'
import { InputComponent } from './inputs/input.component'

@NgModule({
  imports: [CommonModule],
  declarations: [
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    InputComponent,
  ],
  exports: [PrimaryButtonComponent, SecondaryButtonComponent, InputComponent],
})
export class UiModule {}
