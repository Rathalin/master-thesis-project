import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputDirective } from './inputs/input.directive'
import { PrimaryButtonDirective } from './buttons/primary-button.directive'
import { SecondaryButtonDirective } from './buttons/secondary-button.directive'
import { SubtleButtonDirective } from './buttons/subtle-button.directive'
import { InputErrorComponent } from './inputs/input-error/input-error.component'

@NgModule({
  imports: [CommonModule],
  declarations: [
    InputDirective,
    PrimaryButtonDirective,
    SecondaryButtonDirective,
    SubtleButtonDirective,
    InputErrorComponent,
  ],
  exports: [
    InputDirective,
    PrimaryButtonDirective,
    SecondaryButtonDirective,
    SubtleButtonDirective,
    InputErrorComponent,
  ],
})
export class UiModule {}
