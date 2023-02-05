import { Injectable } from '@angular/core'
import { CollectionService } from './collection.service'
import { BehaviorSubject } from 'rxjs'
import { AuthorContentType, RequestState } from '@angular-micro-frontends/types'

@Injectable({
  providedIn: 'root',
})
export class AuthorService extends CollectionService {
  public queryAuthors() {
    return this.query<AuthorContentType[]>('/authors')
  }
}
