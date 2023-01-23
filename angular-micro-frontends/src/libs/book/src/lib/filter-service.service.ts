import { Injectable } from '@angular/core'
import { BookService } from './book.service'
import { BookOwnershipService } from './book-ownership.service'
import { AuthorService } from './author.service'
import { combineLatest, combineLatestAll, filter, map, merge } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FilterServiceService {
  constructor(
    private readonly booksService: BookService,
    private readonly bookOwnershipService: BookOwnershipService,
    private readonly authorService: AuthorService
  ) {}
}
