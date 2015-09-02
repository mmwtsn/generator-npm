var generators = require('yeoman-generator')

module.exports = generators.Base.extend({
  log: function () {
    console.log('Hello from Yeoman!')
  }
})
