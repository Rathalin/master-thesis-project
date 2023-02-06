import { Injectable } from '@angular/core'
import { CollectionService } from './collection.service'
import {
  AuthorAttributes,
  AuthorContentType,
  ID,
} from '@angular-micro-frontends/type-definitions'

@Injectable({
  providedIn: 'root',
})
export class AuthorService extends CollectionService {
  public queryAuthors() {
    return this.query<AuthorContentType[]>('/authors')
  }

  public createAuthor(authorData: AuthorAttributes) {
    return this.create<typeof authorData, AuthorContentType>(
      `/authors`,
      authorData
    )
  }

  public updateAuthor(id: ID, authorData: Partial<AuthorAttributes>) {
    return this.update<typeof authorData, AuthorContentType>(
      `/authors/${id}`,
      authorData
    )
  }

  public deleteAuthor(id: ID) {
    return this.delete<AuthorContentType>(`/authors/${id}`)
  }
}
