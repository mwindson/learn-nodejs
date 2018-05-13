const readline = require('readline')
const fs = require('fs')
const os = require('os')
const { promisify } = require('util')
const path = require('path')

const input = fs.createReadStream(path.resolve(__dirname, 'ms.txt'))
const out = fs.createWriteStream(path.resolve(__dirname, 'ms.out.txt'))
const rl = readline.createInterface({ input })

let key = null
let value = null
let hasInsert = false
const s = 'C = 8'
let { key: inputKey, value: inputValue } = parse(s)
let index = 0
rl.on('line', line => {
  // 包含key,value的行
  if (line.indexOf('=') !== -1) {
    let result = parse(line)
    key = result.key
    value = result.value
    if (key === inputKey && value >= inputValue) {
      out.write(key + '=' + inputValue + '\n')
      out.write(value + '\n')
      hasInsert = true
    } else {
      out.write(line + '\n')
    }
  } else if (line.trim() === '') {
    // 空行
    if (key && key === inputKey && !hasInsert) {
      out.write(inputValue + '\n')
    } else {
      out.write(line + '\n')
    }
  } else {
    // 只有value的行
    let newValue = line.trim()
    if (key && key === inputKey && newValue >= inputValue && !hasInsert) {
      out.write(inputValue + '\n')
      hasInsert = true
    }
    out.write(line + '\n')
  }
  console.log(`${index}: ${line}`)
  index += 1
})

rl.on('close', () => {
  console.log('readline close')
  if (!hasInsert) {
    out.write(s + '\n')
  }
  out.end()
})

function parse(s) {
  const index = s.indexOf('=')
  if (index !== -1) {
    return { key: s.substr(0, index).trim(), value: s.substr(index + 1).trim() }
  } else {
    return null
  }
}
