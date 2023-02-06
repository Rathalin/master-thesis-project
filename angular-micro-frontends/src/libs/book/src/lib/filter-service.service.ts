import { Injectable } from '@angular/core'
import { BookService } from './book.service'
import { MyBookService } from './my-book.service'
import { AuthorService } from './author.service'
import { combineLatest, combineLatestAll, filter, map, merge } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FilterServiceService {
  constructor(
    private readonly booksService: BookService,
    private readonly bookOwnershipService: MyBookService,
    private readonly authorService: AuthorService
  ) {}
}
