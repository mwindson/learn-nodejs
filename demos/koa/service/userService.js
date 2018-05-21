/**
 * service for users
 */

module.exports = {
  storeInfo: function() {
    console.log('store user info')
  },
  assignName(socket, guestNumber, nickName, namesUsed) {
    const name = 'Guest' + guestNumber
    nickName[socket.id] = name
    socket.emit('nameResult', {
      success: true,
      name
    })
    namesUsed.push(name)
    return guestNumber + 1
  },
  joinRoom(socket, room) {
    socket.join(room)
    
  }
}
