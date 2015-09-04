var chalk = require('chalk')
var generators = require('yeoman-generator')
var slugify = require('slugify')
var yosay = require('yosay')
var validatePackageName = require('validate-npm-package-name')

module.exports = generators.Base.extend({
  prompting: function () {
    var done = this.async()

    this.log(yosay(
      'Welcome to the interactive ' +
      chalk.red('ATTN:') +
      ' Node module generator!'
    ))

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What\'s the name of your module?',
        validate: function (response) {
          var valid = Boolean(validatePackageName(response).validForNewPackages)

          if (valid) {
            return true
          } else {
            return 'Invalid npm package name!'
          }
        },
        default: slugify(this.appname).toLowerCase()
      },
      {
        type: 'input',
        name: 'description',
        message: 'What\'s this package do?',
        default: 'Please fill me out'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Who is the author of this module?',
        default: this.user.git.name
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is their e-mail address?',
        default: this.user.git.email
      },
      {
        type: 'confirm',
        name: 'open',
        message: 'Is this module open source?',
        default: true
      },
      {
        type: 'confirm',
        name: 'es6',
        message: 'Finally, will it be written in ES6?',
        default: true
      }
    ]

    this.prompt(prompts, function (answers) {
      this.answers = answers
      this.answers.name = slugify(answers.name)

      done()
    }.bind(this))
  },
  writing: function () {
    var files = [
      '.gitignore',
      'LICENSE',
      'README.md',
      'index.js',
      'package.json',
      'test/index.js',
      'test/mocha.opts'
    ]

    files.forEach(function (file) {
      if (file !== 'LICENSE' || this.answers.open) {
        this.fs.copyTpl(
          this.templatePath(file),
          this.destinationPath(file),
          this.answers
        )
      }
    }.bind(this))
  }
})
