/* global describe, it */
<% if (es6) { %>
import assert from 'assert'
import index from '../src'

describe('Module', () => {
  it('exports an object', () => {
    assert.strictEqual(typeof index, 'object')
  })
})
<% } else { %>
var assert = require('assert')
var index = require('..')

describe('Module', function () {
  it('exports an object', function () {
    assert.strictEqual(typeof index, 'object')
  })
})
<% } -%>
