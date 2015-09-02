var chalk = require('chalk')
var generators = require('yeoman-generator')
var yosay = require('yosay')

module.exports = generators.Base.extend({
  prompting: function () {
    this.log(yosay(
      'Welcome to the interactive ' +
      chalk.red('ATTN:') +
      ' Node module generator!'
    ))
  }
})
