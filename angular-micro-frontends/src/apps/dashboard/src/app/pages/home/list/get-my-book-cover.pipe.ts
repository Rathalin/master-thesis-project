import {
  ImageFile,
  MyBookContentType,
} from '@angular-micro-frontends/type-definitions'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'getMyBookCover',
})
export class GetMyBookCoverPipe implements PipeTransform {
  transform(myBook: MyBookContentType): ImageFile | null {
    return myBook.attributes.book.data.attributes.cover.data?.attributes ?? null
  }
}
