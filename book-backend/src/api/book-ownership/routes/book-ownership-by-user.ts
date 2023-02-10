export default {
  routes: [
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
  ],
}
