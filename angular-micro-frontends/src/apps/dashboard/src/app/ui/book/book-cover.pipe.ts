import {
  BookContentType,
  ImageFile,
} from '@angular-micro-frontends/type-definitions'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'bookCover',
})
export class GetBookCoverPipe implements PipeTransform {
  transform(book: BookContentType | null | undefined): ImageFile | null {
    if (book == null) {
      return null
    }
    return book.attributes.cover.data?.attributes ?? null
  }
}
