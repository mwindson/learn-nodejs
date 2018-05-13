const colors = require('colors')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { stdin, stdout, stderr, cwd } = require('process')

/**
 * 问题描述：用node命令行实现文件浏览的功能
 * 选择文件时，程序需要显示该文件的内容
 * 选择目录时，程序需要显示该目录下的信息
 * 结束时，程序退出
 */
fs.readdir(process.cwd(), (err, files) => {
  console.log('')
  if (!files.length) {
    console.log('No files to show'.red)
    return
  }
  console.log('Select which file you want to see: '.green)
  const stats = []
  files.forEach((file, index) => {
    listFile(files, index, stats)
  })
})

function listFile(files, i, stats) {
  const filename = files[i]
  fs.stat(path.resolve(filename), (err, stat) => {
    stats[i] = stat
    if (stat.isDirectory()) {
      stdout.write(`${i + 1}.  ${filename}   `.blue)
      // console.log(`${i + 1}.  ${filename}`)
    } else if (stat.isFile()) {
      stdout.write(`${i + 1}.  ${filename}   `)
    }
    if (i === files.length - 1) {
      console.log('')
      stdout.write('Enter your choice: '.green)
      stdin.resume()
      stdin.setEncoding('utf8')
      aa('data').then((chunk)=>{
        const id = Number(chunk)
        if (Number.isInteger(id) && id <= files.length) {
          stdout.write(id)
          stdin.pause()
          readFileOrDir(files[id - 1], stats[id - 1])
        } else {
          stdout.write('Please enter a valid file id: \n'.red)
          stdout.write('Enter your choice: '.green)
        }
      })
      // stdin.on('data', function(chunk) {
      //   const id = Number(chunk)
      //   if (Number.isInteger(id) && id <= files.length) {
      //     stdout.write(id)
      //     stdin.pause()
      //     readFileOrDir(files[id - 1], stats[id - 1])
      //   } else {
      //     stdout.write('Please enter a valid file id: \n'.red)
      //     stdout.write('Enter your choice: '.green)
      //   }
      // })
    }
  })
}
function readFileOrDir(filename, stat) {
  if (stat.isDirectory()) {
    fs.readdir(path.resolve(filename), (err, files) => {
      console.log(`-----${files.length} files in ${filename}-----`)
      files.forEach(file => console.log(`    -   ${file}`))
    })
    console.log('')
  } else {
    fs.readFile(path.resolve(filename), 'utf8', function(err, data) {
      console.log('')
      console.log(data)
    })
  }
}
