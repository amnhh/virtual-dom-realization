const jsdom = require('jsdom')

module.exports = (new jsdom.JSDOM('<!doctype html><html><body></body></html>')).window.document