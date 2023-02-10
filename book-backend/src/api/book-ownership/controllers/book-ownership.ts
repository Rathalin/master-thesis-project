/**
 * book-ownership controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::book-ownership.book-ownership',

  ({ strapi }) => ({
    async find(ctx) {
      const userId = ctx.state.user?.id
      if (userId != null) {
        if (ctx.querystring.length > 0) {
          ctx.querystring += '&'
        }
        ctx.querystring += `filters[user][id][$eq]=${ctx.state.user.id}`
      }
      return super.find(ctx)
    },

    async findOfUser(ctx) {
      return strapi.service('api::book-ownership.book-ownership').find({
        filters: {
          user: ctx.state.user.id ?? -1,
        },
      })
    },
  })
)
