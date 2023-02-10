/**
 * book-ownership controller
 */

import { factories, Strapi } from '@strapi/strapi'

function addUserIdFilter(ctx: any) {
  const userId = ctx.state.user?.id ?? -1
  if (ctx.querystring.length > 0) {
    ctx.querystring += '&'
  }
  ctx.querystring += `filters[user][id][$eq]=${userId}`
}

export default factories.createCoreController(
  'api::book-ownership.book-ownership',
  ({ strapi }) => ({
    async findOneOfUser(ctx) {
      addUserIdFilter(ctx)
      strapi.log.debug(ctx.querystring)
      return super.findOne(ctx.params.id, ctx)
    },
    async findOfUser(ctx) {
      addUserIdFilter(ctx)
      strapi.log.debug(ctx.querystring)
      return super.find(ctx)
    },
  })
)
