import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputDirective } from './inputs/input.directive'
import { PrimaryButtonDirective } from './buttons/primary-button.directive'
import { SecondaryButtonDirective } from './buttons/secondary-button.directive'
import { SubtleButtonDirective } from './buttons/subtle-button.directive'
import { InputErrorComponent } from './inputs/error-handling/input-error.component'
import { GroupErrorComponent } from './inputs/error-handling/group-error.component'
import { LoadingComponent } from './state/loading.component'
import { ErrorComponent } from './state/error.component'
import { CardDirective } from './card/card.directive'

@NgModule({
  imports: [CommonModule],
  declarations: [
    InputDirective,
    PrimaryButtonDirective,
    SecondaryButtonDirective,
    SubtleButtonDirective,
    InputErrorComponent,
    GroupErrorComponent,
    LoadingComponent,
    ErrorComponent,
    CardDirective,
  ],
  exports: [
    InputDirective,
    PrimaryButtonDirective,
    SecondaryButtonDirective,
    SubtleButtonDirective,
    InputErrorComponent,
    GroupErrorComponent,
    LoadingComponent,
    ErrorComponent,
    CardDirective,
  ],
})
export class UiModule {}
