import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GraphQLModule, createApollo } from './graphql/graph-ql.module'

@NgModule({
  imports: [CommonModule, GraphQLModule],
})
export class BookModule {}
