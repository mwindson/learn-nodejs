const redis = require('redis')
const { promisify } = require('util')
const User = require('./User')

const client = redis.createClient({ host: '127.0.0.1', port: '6379' })

/**
 * simple-social-graph
 * user:<id>:follows 关注的人
 * user:<id>:followers 粉丝
 * user:<id>:data 用户数据
 */
const testUsers = {
  'mark@facebook.com': { name: 'Mark' },
  'bill@163.com': { name: 'Bill' },
  'jeff@qq.com': { name: 'Jeff' },
  'fred@fedex.com': { name: 'Fred' }
}
/**
 * 创建用户的函数
 */
function create(users, fn) {
  const newUsers = {}
  for (let key of Object.keys(users)) {
    const data = users[key]
    const user = new User(key, data)
    newUsers[key] = user
    user.save(client)
  }
  return newUsers
}

const users = create(testUsers)
users['bill@163.com']
  .follow(client, 'jeff@qq.com')
  .then(() => {
    console.log('+ bill follows jeff')
    return users['jeff@qq.com'].getFollowers(client)
  })
  .then(res => {
    console.log("jeff's followers: ", res)
    return users['jeff@qq.com'].getFriends(client)
  })
  .then(res => {
    console.log("jeff's friends:", res)
    return users['jeff@qq.com'].follow(client, 'bill@163.com')
  })
  .then(res => {
    console.log('+ jeff follows bill')
    return users['jeff@qq.com'].getFriends(client)
  })
  .then(res => {
    console.log("jeff's friends:", res)
    client.expire('user:mark@facebook.com:data', 10, function(err, res) {
      if (err) {
        console.err(err)
      } else {
        console.log(res)
        console.log('delete mark after 10s')
      }
      process.exit(0)
    })
  })
  .catch(err => {
    console.err(err)
  })
