const http = require('http')
const colors = require('colors')
const process = require('process')
const qs = require('querystring')
const requestAsync = (options, data) => {
  return new Promise((resolve, reject) => {
    let responseData = ''
    try {
      const req = http.request(options, res => {
        res.on('data', chunk => (responseData += chunk))
        res.on('end', () => resolve(responseData))
      })
      console.log(data)
      console.log('sending request...')
      req.end(qs.stringify(data))
    } catch (error) {
      console.error(error)
    }
  })
}
const options = {
  host: '127.0.0.1',
  port: 3000,
  path: '/test',
  method: 'GET'
}

function send(name) {
  requestAsync(
    {
      host: '127.0.0.1',
      port: 3000,
      path: '/test',
      method: 'POST'
    },
    { name }
  ).then(res => {
    console.log(`request complete ${res}`.green)
    process.stdout.write('\n your name: ')
  })
}
process.stdout.write('\n your name: ')
process.stdin.resume()
process.stdin.setEncoding('utf8')
process.stdin.on('data', name => {
  send(name.replace('\r\n', ''))
})
