const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  console.log('CPU数', numCPUs)
  console.log('master is running')
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('fork', worker => {
    console.log(`worker ${worker.id} is forked`)
  })
  cluster.on('online', worker => {
    console.log(`worker ${worker.id} is running`)
  })
  cluster.on('listening', (worker, address) => {
    console.log(`A worker ${worker.id} is now connected to ${address.address}:${address.port}`)
  })
  cluster.on('disconnect', worker => {
    console.log(`worker ${worker.id} has disconnected`)
  })
  cluster.on('exit', function(worker, code, signal) {
    console.log(`Worker ${worker.id} exit`)
  })
} else {
  http
    .createServer(function(req, res) {
      res.writeHead(200)
      res.end(`I am a worker running in process ${process.pid}`)
    })
    .listen(3000)
  setTimeout(() => process.disconnect(), 1000)
}
