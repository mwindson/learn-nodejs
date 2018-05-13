/**
 * @name 用户模型
 */
class User {
  constructor(id, data) {
    this.id = id
    this.data = data
  }
  save(redisClient) {
    return new Promise((resolve, reject) => {
      if (this.id == null) {
        this.id = String(Math.random).substring(3)
      }
      redisClient.hmset(`user:${this.id}:data`, this.data, function(err, res) {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }

  /**
   * 发起或关注
   * @param {RedisClient} redisClient
   * @param {String} userId
   * @param {Function} fn
   */
  follow(redisClient, userId) {
    return new Promise((resolve, reject) => {
      redisClient
        .multi()
        .sadd(`user:${this.id}:follows`, userId)
        .sadd(`user:${userId}:followers`, this.id)
        .exec((err, replies) => {
          if (err) {
            reject(err)
          } else {
            resolve(replies)
          }
        })
    })
  }
  unfollow(redisClient, userId) {
    return new Promise((resolve, reject) => {
      redisClient
        .multi()
        .srem(`user:${this.id}:follows`, userId)
        .srem(`user:${userId}:followers`, this.id)
        .exec((err, replies) => {
          if (err) {
            reject(err)
          } else {
            resolve(replies)
          }
        })
    })
  }
  getFollows(redisClient) {
    return new Promise((resolve, reject) => {
      redisClient.smembers(`user:${this.id}:follows`, function(err, res) {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }
  getFollowers(redisClient) {
    return new Promise((resolve, reject) => {
      redisClient.smembers(`user:${this.id}:followers`, function(err, res) {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }
  getFriends(redisClient) {
    return new Promise((resolve, reject) => {
      redisClient.sinter(`user:${this.id}:follows`, `user:${this.id}:followers`, function(err, res) {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }
}

module.exports = User
