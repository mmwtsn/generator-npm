/* global beforeEach, describe, it */

/**
 * Module dependencies
 *
 * See the Yeoman documentation for the full list of helper functions
 * {@link http://yeoman.github.io/generator/assert.html}
 * {@link http://yeoman.github.io/generator/helpers.html}
 */

var assert = require('yeoman-generator').assert
var helpers = require('yeoman-generator').test
var path = require('path')

/**
 * Helper function to call the @attn/npm generator
 * @param {Object} options - Prompt response values mocking user input
 * @param {function} done - Mocha's async complete callback function
 * @private
 */

function runGenerator (options, done) {
  helpers
    .run(path.join(__dirname, '../app'))
    .withPrompts(options)
    .on('end', done)
}

/**
 * White list of files that this generator creates by default
 * @private
 */

const files = [
  '.gitignore',
  'package.json',
  'LICENSE',
  'README.md',
  'index.js',
  'test/mocha.opts',
  'test/index.js'
]

describe('generator-npm', () => {
  describe('by default', () => {
    beforeEach((done) => {
      runGenerator({}, done)
    })

    it('creates the default files', (done) => {
      assert.file(files)

      done()
    })

    it('is open source', (done) => {
      assert.fileContent('LICENSE', /MIT/)
      assert.fileContent('package.json', /"license": "MIT"/)
      assert.noFileContent('package.json', /private/)

      done()
    })

    it('uses ES6', (done) => {
      assert.fileContent('package.json', /babel/)
      assert.fileContent('test/index.js', /import/)
      assert.fileContent('index.js', /export/)
      assert.noFileContent('test/index.js', /require/)
      assert.noFileContent('index.js', /module.exports/)

      done()
    })
  })
})
