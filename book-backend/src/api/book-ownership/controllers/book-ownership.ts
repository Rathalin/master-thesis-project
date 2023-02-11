/**
 * book-ownership controller
 */

import { factories } from '@strapi/strapi'

function addUserIdToBody(ctx: any) {
  const userId: number | null = ctx.state.user?.id ?? null
  if (userId == null) {
    return ctx.badRequest('User ID is missing')
  }
  ctx.request.body.data.user = userId
}

function addUserIdToFilter(ctx: any) {
  const userId: number = ctx.state.user?.id ?? -1
  if (ctx.querystring.length > 0) {
    ctx.querystring += '&'
  }
  ctx.querystring += `filters[user][id][$eq]=${userId}`
}

export default factories.createCoreController(
  'api::book-ownership.book-ownership',
  ({ strapi }) => ({
    async createOfUser(ctx) {
      // addUserIdToBody(ctx)
      strapi.log.debug(JSON.stringify(ctx.request.body['data']))
      return super.create(ctx)
    },
    async deleteOfUser(ctx) {
      addUserIdToFilter(ctx)
      return super.delete(ctx)
    },
    async findOneOfUser(ctx) {
      addUserIdToFilter(ctx)
      return super.findOne(ctx)
    },
    async findOfUser(ctx) {
      addUserIdToFilter(ctx)
      return super.find(ctx)
    },
    async updateOfUser(ctx) {
      addUserIdToFilter(ctx)
      return super.update(ctx)
    },
  })
)
