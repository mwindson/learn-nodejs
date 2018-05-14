module.exports = app => {
  return {
    'get /': app.controller.user.getUser,
    'get /userinfo': app.controller.user.getUserInfo
  }
}
