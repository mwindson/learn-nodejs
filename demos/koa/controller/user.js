/**
 * user controller
 */
const fs = require('fs')
const path = require('path')
module.exports = {
  async getIndex(ctx, service) {
    const filePath = path.join(__dirname, '../view/index.html')
    if (fs.existsSync(filePath)) {
      const fileContent = fs.createReadStream(filePath)
      ctx.type = 'html'
      ctx.body = fileContent
    } else {
      ctx.status = 404
      ctx.body = '<h1>主页消失了</h1>'
    }
    // const stats = await sendfile(ctx, filePath)
    // console.log(stats.isFile())
    // if (!ctx.status) {
    // ctx.throw(404)
    // }
  },
  async getUserInfo(ctx, service) {
    ctx.body = '<h1>get user info</h1>'
  }
}
