const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  console.log('[master] ' + 'start master...')

  for (let i = 0; i < numCPUs; i++) {
    const wk = cluster.fork()
    wk.send('[master] ' + 'hi worker' + wk.id)
  }
  cluster.on('message', (worker, msg, handle) => {
    console.log(`[worker] worker ${worker.id} : ${msg}`)
  })
  cluster.on('exit', (worker, code, signal) => {
    console.log(`[worker] ${worker.id} disconnected`)
    for (let id in cluster.workers) {
      console.log(`woker ${id} is working`)
    }
    cluster.fork()
  })
} else {
  process.on('message', function(msg) {
    console.log('[worker] ' + msg)
    process.send('[worker] worker' + cluster.worker.id + ' received!')
    process.disconnect()
  })
  http.createServer().listen(3000)
}
