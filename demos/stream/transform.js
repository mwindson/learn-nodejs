const { Readable, Writable, Transform, Duplex } = require('stream')

// writable流需要实现write方法
const myWritable = new Writable({
  write(chunk, encoding, callback) {
    console.log('writing...', chunk.toString())
    callback()
  }
})
myWritable.write('test', () => {
  console.log('write end')
})

// readable流需要实现read方法
const myReadable = new Readable({
  read(size) {
    console.log(`reading... this chunk size is ${size}`)
  }
})
myReadable.push('read test\n')
myReadable.pipe(process.stdout)

const fs = require('fs')
const read$ = fs.createReadStream(__dirname + '/test.txt')
// duplex流需要实现write和read方法
const myDuplex = new Duplex({
  write(chunk, encoding, callback) {
    console.log('writing...')
    console.log(chunk.toString())
    callback()
  },
  read(size) {
    console.log(`reading... this chunk size is ${size}`)
  }
})
read$.pipe(myDuplex).pipe(process.stdout)

// transform流需要实现tranform方法
const myTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase())
    callback()
  }
})

// read$.pipe(myTransform).pipe(process.stdout)
