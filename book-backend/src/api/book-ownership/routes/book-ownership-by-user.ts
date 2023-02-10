export default {
  routes: [
    {
      method: 'GET',
      path: '/book-ownership-by-user',
      handler: 'book-ownership.findOfUser',
    },
  ],
}
