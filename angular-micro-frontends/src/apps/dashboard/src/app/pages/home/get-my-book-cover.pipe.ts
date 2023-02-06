import {
  MediaImage,
  MyBookContentType,
} from '@angular-micro-frontends/type-definitions'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'getMyBookCover',
})
export class GetMyBookCoverPipe implements PipeTransform {
  transform(myBook: MyBookContentType): MediaImage | null {
    return myBook.attributes.book.data.attributes.cover.data?.attributes ?? null
  }
}
