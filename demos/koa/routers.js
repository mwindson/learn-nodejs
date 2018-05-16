module.exports = app => {
  return {
    'get /': app.controller.user.getIndex,
    'get /userinfo': app.controller.user.getUserInfo
  }
}
