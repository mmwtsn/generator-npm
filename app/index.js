var chalk = require('chalk')
var generators = require('yeoman-generator')
var slugify = require('slugify')
var yosay = require('yosay')
var validatePackageName = require('validate-npm-package-name')

module.exports = generators.Base.extend({
  prompting: function () {
    var done = this.async()

    this.option('personal')

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
          if (validatePackageName(response).validForNewPackages) {
            return true
          } else {
            return 'Invalid npm package name!'
          }
        },
        default: function () {
          var name = slugify(this.appname).toLowerCase()

          if (this.options.personal) {
            return name
          } else {
            return '@attn/' + name
          }
        }.bind(this)
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
        type: 'input',
        name: 'username',
        message: 'What is their GitHub username?'
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
      this.answers.personal = this.options.personal
      this.answers.name = slugify(answers.name)

      done()
    }.bind(this))
  },
  writing: function () {
    var files = [
      'gitignore',
      'LICENSE',
      'README.md',
      'package.json',
      'index.js',
      'src/index.js',
      'test/index.js'
    ].filter(function (file) {
      // Filter out license for closed source modules
      if (file === 'LICENSE' && !this.answers.open) {
        return false
      }

      // Filter out transpiler target for ES6 modules
      if (file === 'index.js' && this.answers.es6) {
        return false
      }

      // Filter out source directory structure for ES5 modules
      if (file === 'src/index.js' && !this.answers.es6) {
        return false
      }

      return true
    }.bind(this))

    files.forEach(function (file) {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file === 'gitignore' ? '.gitignore' : file),
        this.answers
      )
    }.bind(this))
  }
})
