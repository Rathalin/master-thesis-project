import {
  ImageFile,
  MyBookContentType,
} from '@angular-micro-frontends/type-definitions'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'myBookCover',
})
export class GetMyBookCoverPipe implements PipeTransform {
  transform(myBook: MyBookContentType | null | undefined): ImageFile | null {
    if (myBook == null) {
      return null
    }
    return myBook.attributes.book.data.attributes.cover.data?.attributes ?? null
  }
}
