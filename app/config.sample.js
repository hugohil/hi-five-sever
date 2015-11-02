var config = module.exports = {
  mongo: {
    url: 'mongodb://admin:pwd@127.0.0.1:27017/hifive'
  },
  server: {
    port: 8080,
    logMode: 'dev'
  },
  authentication: {
    secret: 'secret',
    expire: (60 * 5) // in seconds
  }
}
