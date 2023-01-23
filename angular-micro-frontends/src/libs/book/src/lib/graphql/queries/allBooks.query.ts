import { gql } from 'apollo-angular'

export const GET_BOOKS = gql`
  query GetAllBooks {
    books {
      data {
        id
      }
    }
  }
`
