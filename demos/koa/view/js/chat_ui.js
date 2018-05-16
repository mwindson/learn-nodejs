const socket = io.connect()

$(document).ready(function() {
  const chatApp = new Chat(socket)
  socket.on('nameResult', function(res) {
    const message = res.success ? `You are now known as ${res.name}.` : res.message
    $('#message').append($('<div></div>').html(`<i>${message}</i>`))
  })
  socket.on('joinResult', function(message) {
    $('#room').text(res.room)
    $('#message').append($('<div></div>').html('<i>Room changed.</i>'))
  })
  socket.on('message', message => {
    const newMessage = $('<div></div>').text(message.text)
    $('#room-list').append(newMessage)
  })
  socket.on('rooms', rooms => {
    $('#room-list').empty()
    rooms.forEach(room => {
      const roomName = room.substring(1)
      if (roomName !== '') {
        $('#room-list').append($('<div></div>').text(roomName))
      }
    })
    $('#room-list div').click(function() {
      chatApp.processCommand('/join ' + $(this).text())
      $('#send-message').focus()
    })
  })
  setInterval(() => socket.emit('room'), 1000)
  $('#send-message').focus()
  $('#send-form').submit(function() {
    processUserInput(chatApp, socket)
    return false
  })
})

function processUserInput(chatApp, socket) {
  const message = $('#send-message').val()

  let systemMessage
  // 聊天命令
  if (message.charAt(0) === '/') {
    systemMessage = chatApp.processCommand(message)
    if (systemMessage) {
      $('#message').append($('<div></div>').html(`<i>${systemMessage}</i>`))
    }
  } else {
    // 聊天内容
    chatApp.sendMessage($('#room').text(), message)
    $('#message').append($('<div></div>').text(message))
    $('#message')
      .scrollTop($('#message'))
      .prop('scrollHeight')
  }
  $('#send-message').val(' ')
}
