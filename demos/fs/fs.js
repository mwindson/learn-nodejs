const fs = require('fs')
const { promisify } = require('util')
const path = require('path')

const readdirPromise = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const fsStat = promisify(fs.stat)
const dirPath = 'D:\\workspace\\python\\sentiment-analysis\\FinicialNews\\result'

async function sampling(dirPath, k) {
  const files = await readdirPromise(dirPath)
  const candiates = await files.filter(async file => {
    const stat = await fsStat(path.join(dirPath, file))
    if (stat.isFile() && !file.match(/\w*.csv/)) {
      return true
    } else {
      return false
    }
  })
  const result = []
  let i = 0
  while (i < k) {
    result[i] = candiates[i]
    i += 1
  }
  while (i < candiates.length) {
    const index = Math.floor(Math.random() * i)
    if (index < k) {
      result[index] = candiates[i]
    }
    i += 1
  }
  console.log(result.sort())
}

sampling(dirPath, 10)
