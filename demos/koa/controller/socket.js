/**
 * socket部分的代码
 */
module.exports = {
  listen(server) {
    const socketio = require('socket.io')
    const io = socketio.listen(server)
    io.set('log level', 1)
    
  }
}
