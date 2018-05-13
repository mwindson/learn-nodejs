/**
 * ip无连接，无序 -> tcp面向连接，有序
 * 基于超时和超时实现来实现可靠性
 * 流控制
 * 拥塞控制
 */

/**
 * 基于tcp的聊天程序
 * 功能：
 *   连接到服务器，  显示欢迎，并要求输入用户名，告知有多少其他客户端也连接了
 *   输入用户名，回车，显示连接信息
 *   连接成功后，输入信息回车，可以发送信息
 */
const net = require('net')
const colors = require('colors')

// 客户端连接数
let count = 0
let users = {}
const server = net.createServer(socket => {
  // 传递net.stream的流
  console.log('new connection'.green)
  // 将buffer设置为utf-8编码
  socket.setEncoding('utf8')
  socket.write('> welcome to node-chat\r\n')
  socket.write(`> ${count} other people are connected at this time.\r\n`)
  socket.write('> please write your name and press enter:')
  count += 1
  // 当前连接用户的昵称
  let nickname
  socket.on('data', data => {
    data = data.replace('\r\n', '')
    // 接受数据为nickname
    if (nickname == null) {
      if (users[data]) {
        socket.write('\r\n> nickname already in use. try again'.red)
      } else {
        nickname = data
        users[nickname] = socket // 保存连接
        boardcast(nickname, users, `\r\n> ${nickname} joined in the chat room`)
      }
    } else {
      // 否则，视为聊天数据
      boardcast(nickname, users, `\r\n> ${nickname}: ${data}`, true)
    }
  })
  socket.on('close', err => {
    if (err) {
      console.error(err)
    } else {
      console.log(`connection break`)
      count -= 1
      delete users[nickname]
      boardcast(nickname, users, `\r\n${nickname} left the room`)
    }
  })
})

function boardcast(self, users, msg, expectMyself = false) {
  for (let i in users) {
    if (!expectMyself || i !== self) {
      users[i].write(msg)
    }
  }
}

server.listen(3000, () => {
  console.log('server is listening on *:3000'.green)
})
