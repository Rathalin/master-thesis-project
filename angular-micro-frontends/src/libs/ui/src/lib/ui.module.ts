import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputDirective } from './inputs/input.directive'
import { PrimaryButtonDirective } from './buttons/primary-button.directive';
import { SecondaryButtonDirective } from './buttons/secondary-button.directive';
import { SubtleButtonDirective } from './buttons/subtle-button.directive'

@NgModule({
  imports: [CommonModule],
  declarations: [InputDirective, PrimaryButtonDirective, SecondaryButtonDirective, SubtleButtonDirective],
  exports: [InputDirective, PrimaryButtonDirective, SecondaryButtonDirective, SubtleButtonDirective],
})
export class UiModule {}
