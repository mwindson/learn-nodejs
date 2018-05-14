/**
 * user controller
 */

module.exports = {
  async getUser(ctx, service) {
    await service.userService.storeInfo()
    ctx.body = '<h1>get user</h1>'
  },
  async getUserInfo(ctx, service) {
    ctx.body = '<h1>get user info</h1>'
  }
}
