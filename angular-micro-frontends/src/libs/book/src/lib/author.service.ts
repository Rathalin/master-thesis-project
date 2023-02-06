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
  public getAuthors() {
    return this.query<AuthorContentType[]>(`/authors`)
  }

  public getAuthor(id: ID) {
    return this.query<AuthorContentType>(`/authors/${id}`)
  }

  public createAuthor(authorData: AuthorAttributes) {
    const payload = {
      data: authorData,
    }
    return this.create<typeof payload, AuthorContentType>(`/authors`, payload)
  }

  public updateAuthor(id: ID, authorData: Partial<AuthorAttributes>) {
    const payload = {
      data: authorData,
    }
    return this.update<typeof payload, AuthorContentType>(
      `/authors/${id}`,
      payload
    )
  }

  public deleteAuthor(id: ID) {
    return this.delete<AuthorContentType>(`/authors/${id}`)
  }
}
