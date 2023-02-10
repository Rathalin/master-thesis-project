/**
 * book-ownership router
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreRouter(
  'api::book-ownership.book-ownership',
  {
    config: {
      find: {
        middlewares: [
          (ctx, next) => {
            strapi.log.debug(JSON.stringify(ctx.state))
            const userId = ctx.state.user.id
            // if ()
            return next()
          },
        ],
      },
    },
  }
)
