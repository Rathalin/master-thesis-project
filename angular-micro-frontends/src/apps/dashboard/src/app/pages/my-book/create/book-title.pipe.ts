import { BookContentType } from '@angular-micro-frontends/type-definitions'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'bookTitle',
})
export class BookTitlePipe implements PipeTransform {
  transform(book: BookContentType): string {
    let text = `${book.attributes.title} - `
    const authors = book.attributes.authors.data
    for (let i = 0; i < authors.length; i++) {
      const author = authors[i]
      text += `${author.attributes.firstname} ${author.attributes.lastname}`
      if (i < authors.length - 1) text += ', '
    }
    return text
  }
}
