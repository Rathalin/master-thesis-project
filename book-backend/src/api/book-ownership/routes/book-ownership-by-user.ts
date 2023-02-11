export default {
  routes: [
    {
      method: 'POST',
      path: '/book-ownerships-of-user',
      handler: 'book-ownership.createOfUser',
    },
    {
      method: 'DELETE',
      path: '/book-ownerships-of-user/:id',
      handler: 'book-ownership.deleteOfUser',
    },
    {
      method: 'GET',
      path: '/book-ownerships-of-user',
      handler: 'book-ownership.findOfUser',
    },
    {
      method: 'GET',
      path: '/book-ownerships-of-user/:id',
      handler: 'book-ownership.findOneOfUser',
    },
    {
      method: 'PUT',
      path: '/book-ownerships-of-user/:id',
      handler: 'book-ownership.updateOfUser',
    },
  ],
}
