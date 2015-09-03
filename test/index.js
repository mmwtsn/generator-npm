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

describe('generator-npm', () => {
  describe('by default', () => {
  })
})
