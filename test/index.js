/* global beforeEach, describe, it */

/**
 * See the Yeoman documentation for the full list of helper functions.
 *
 * {@link http://yeoman.github.io/generator/assert.html}
 * {@link http://yeoman.github.io/generator/helpers.html}
 */
var assert = require('yeoman-generator').assert
var helpers = require('yeoman-generator').test
var path = require('path')

/**
 * Helper function to call the @attn/npm generator.
 *
 * @param {Object} options - Prompt response values mocking user input.
 * @param {function} done - Mocha's async complete callback function.
 */
function runGenerator (options, prompts, done) {
  helpers
    .run(path.join(__dirname, '../app'))
    .withOptions(options)
    .withPrompts(prompts)
    .on('end', done)
}

// White list of files that this generator creates by default
const files = [
  '.gitignore',
  'package.json',
  'LICENSE',
  'README.md',
  'src/index.js',
  'test/index.js'
]

describe('generator-npm', () => {
  describe('with default values', () => {
    beforeEach(done => {
      runGenerator({}, {}, done)
    })

    it('creates the default files', done => {
      assert.file(files)

      done()
    })
  })

  describe('when open source', () => {
    beforeEach(done => {
      runGenerator({}, { open: true }, done)
    })

    it('generates a MIT license', done => {
      assert.fileContent('LICENSE', /MIT/)

      done()
    })

    it('adds "MIT" to the package\'s "license" property', done => {
      assert.fileContent('package.json', /"license": "MIT"/)

      done()
    })
  })

  describe('when closed source', () => {
    beforeEach(done => {
      runGenerator({}, { open: false }, done)
    })

    it('does not generate a license', done => {
      assert.noFile('LICENSE')

      done()
    })

    it('adds "UNLICENSED" to the package\'s "license" property', done => {
      assert.fileContent('package.json', /"license": "UNLICENSED"/)

      done()
    })
  })

  describe('when ES6', () => {
    beforeEach(done => {
      runGenerator({}, { es6: true }, done)
    })

    it('uses `import`', done => {
      assert.fileContent('test/index.js', /import/)
      assert.noFileContent('test/index.js', /require/)

      done()
    })

    it('uses `export`', done => {
      assert.fileContent('src/index.js', /export default/)
      assert.noFileContent('src/index.js', /module.exports/)

      done()
    })

    it('starts with a source directory', done => {
      assert.fileContent('test/index.js', /src/)
      assert.file('src/index.js')
      assert.noFile('index.js')

      done()
    })

    it('transpiles to ES5', done => {
      assert.fileContent('package.json', /"prepublish": "babel/)

      done()
    })

    it('requires Babel', done => {
      assert.fileContent('package.json', /babel/)

      done()
    })
  })

  describe('when ES5', () => {
    beforeEach(done => {
      runGenerator({}, { es6: false }, done)
    })

    it('uses `require`', done => {
      assert.fileContent('test/index.js', /require/)
      assert.noFileContent('test/index.js', /import/)

      done()
    })

    it('uses `module.exports`', done => {
      assert.fileContent('index.js', /module.exports/)
      assert.noFileContent('index.js', /export default/)

      done()
    })

    it('does not require Babel', done => {
      assert.noFileContent('package.json', /babel/)

      done()
    })
  })

  describe('--personal', () => {
    beforeEach(done => {
      runGenerator(
        { personal: true },
        { author: 'A. Person', email: 'aperson@attn.com' },
        done
      )
    })

    it('assigns copyright correctly', done => {
      assert.fileContent('LICENSE', /aperson@attn.com/)
      assert.fileContent('LICENSE', /A. Person/)
      assert.noFileContent('LICENSE', /Our Time Media/)

      done()
    })
  })
})
