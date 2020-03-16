var retext = require('retext')
var pos = require('retext-pos')
var keywords = require('retext-keywords')
var toString = require('nlcst-to-string')

const text = require('../data.js')

text.forEach(el => {
  console.log(el.keys.interest)
  retext()
  .use(pos)
  .use(keywords)
  .process(el.body.summary, done)
})

function done(err, file) {
  if (err) throw err

  let keywords = []
  let keyphrases = []

  file.data.keywords.forEach(function(keyword) {
    keywords.push(toString(keyword.matches[0].node))
  })

  file.data.keyphrases.forEach(function(phrase) {
    keyphrases.push(phrase.matches[0].nodes.map(stringify).join(''))
    function stringify(value) {
      return toString(value)
    }
  })

  console.log(keywords, keyphrases)

  console.log()
}