/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter.git>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
require('should');
var matter = require('..');

describe('parse cson:', function () {
  it('should parse CSON front matter.', function () {
    var actual = matter.read('./test/fixtures/lang-cson.md', {
      lang: 'cson',
      eval: true
    });

    actual.data.title.should.equal('CSON');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

  it('should evaluate functions in CSON front matter.', function () {
    var actual = matter.read('./test/fixtures/lang-cson-fn.md', {
      lang: 'cson',
      eval: true
    });

    actual.data.fn.should.be.a.function;
    actual.data.title.should.equal('CSON functions');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

  it('should evaluate functions in auto-detected CSON front matter.', function () {
    var actual = matter.read('./test/fixtures/autodetect-cson-fn.md', {
      autodetect: true,
      eval: true
    });

    actual.data.fn.should.be.a.function;
    actual.data.title.should.equal('CSON functions');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

  it('should auto-detect cson as the language.', function () {
    var actual = matter.read('./test/fixtures/autodetect-cson.md', {
      autodetect: true,
      eval: true
    });

    actual.data.title.should.equal('autodetect-CSON');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });
});