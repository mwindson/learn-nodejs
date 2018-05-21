const App = require('./App/core')
const app = new App()

app.setRouters()

const opts = {
  maxage: 1000 * 60 * 60 * 24 * 5, // 5天，默认为0
  hidden: false, // 能否返回隐藏文件（以`.`打头），默认false不返回
  index: 'index.html', // 默认文件名
  defer: true, // 在yield* next之后返回静态文件，默认在之前
  gzip: true
  // 允许传输gzip，如静态文件夹下有两个文件，index.js和index.js.gz，
  // 会优先传输index.js.gz，默认开启
}
app.setStaticServe('/view', opts)

const http = require('http')
const server = http.Server(app.callback())
const io = require('socket.io')(server)

server.listen(3000, '127.0.0.1', () => {
  console.log('服务器启动')
})
process.on('uncaughtException', function(err) {
  console.log(err)
})
