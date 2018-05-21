const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  console.log('CPU数', numCPUs)
  console.log('master is running')
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', function(worker, code, signal) {
    console.log(`Worker ${worker.process.pid} died`)
  })
} else {
  http
    .createServer(function(req, res) {
      console.log(`worker ${cluster.worker.id}`)
      res.writeHead(200)
      res.end(`I am a worker running in process ${process.pid}`)
    })
    .listen(3000)
  console.log(`worker ${process.pid} is running`)
}
