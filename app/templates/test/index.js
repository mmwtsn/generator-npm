<% if (es6) { -%>
import test from 'tape'
import index from '../src'

test('module', t => {
  t.equal(typeof index, 'object', 'default export is an object')
  t.end()
})
<% } else { -%>
var test = require('tape')
var index = require('..')

test('module', function (t) {
  t.equal(typeof index, 'object', 'exports an object')
  t.end()
})
<% } -%>
