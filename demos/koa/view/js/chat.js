/**
 * 用于聊天的socket类
 */
class Chat {
  constructor(socket) {
    this.socket = socket
  }
  sendMessage(room, text) {
    const message = { room, text }
    this.socket.emit('message', message)
  }
  changeRoom(room) {
    this.socket.emit('join', { newRoom: room })
  }
  processCommand(command) {
    const words = command.split(' ')
    const comm = words[0].substring(1).toLowerCase()

    switch (comm) {
      case 'join':
        words.shift()
        const room = words.join(' ')
        this.changeRoom(room)
        return 'success'
      case 'nick':
        words.shift()
        const name = words.join(' ')
        this.socket.emit('changeName', name)
        return 'success'
      default:
        return 'Unrecognized command.'
    }
  }
}
