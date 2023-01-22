import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GraphQLModule } from './graphql/grahql.module'

@NgModule({
  imports: [CommonModule, GraphQLModule],
})
export class BookModule {}
