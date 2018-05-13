const http = require('http')
const fs = require('fs')
const qs = require('querystring')
const colors = require('colors')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    const form = [
      '<form method="POST" action="/url"',
      '<h1>My form</h1>',
      '<fieldset>',
      '<label>Personal information</label>',
      '<p>What is your name?</p>',
      '<input type="text" name="name"/>',
      '<p><button>Submit</button></p>',
      '</from>'
    ].join('')
    // const imgStream = fs.createReadStream(__dirname + '/img.jpg')
    // imgStream.pipe(res)
    res.end(form)
  } else if (req.url === '/url' && req.method === 'POST') {
    let body = ''
    req.on('data', chunk => {
      body += chunk
    })
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(`<p>content-type:${req.headers['content-type']}</p><p>Data:</p><pre>${body}</pre>`)
    })
  } else if (req.url === '/test') {
    if (req.method === 'GET') {
      res.writeHead(200)
      res.end('this is a test service')
    } else if (req.method === 'POST') {
      let body = ''
      req.on('data', chunk => {
        body += chunk
      })
      req.on('end', () => {
        if (qs.parse(body)) {
          res.writeHead(200)
          const name = qs.parse(body).name
          console.log(`get name ${name}`.green)
          res.end(`your name is ${name}`)
        } else {
          res.writeHead(500)
          console.log(`get name Error`.red)
          res.end(`Send name Error`)
        }
      })
    }
  } else {
    res.writeHead(404)
    res.end('404 Not Found')
  }
})

server.listen(3000, () => {
  console.log('server is listening port 3000!!')
})
