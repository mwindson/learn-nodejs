const App = require('./App/core')
const app = new App()
app.setRouters()
app.listen(3000, '127.0.0.1', () => {
  console.log('服务器启动')
})
