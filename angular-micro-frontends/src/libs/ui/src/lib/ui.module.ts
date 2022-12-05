import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputDirective } from './inputs/input.directive'
import { PrimaryButtonDirective } from './buttons/primary-button.directive';
import { SecondaryButtonDirective } from './buttons/secondary-button.directive'

@NgModule({
  imports: [CommonModule],
  declarations: [InputDirective, PrimaryButtonDirective, SecondaryButtonDirective],
  exports: [InputDirective, PrimaryButtonDirective, SecondaryButtonDirective],
})
export class UiModule {}
