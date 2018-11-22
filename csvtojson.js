const csv = require('csvtojson');
const Textfile = require('eztxt4fs')
const alphaBar = require('./src/alphaBar');
let count = alphaBar.length

alphaBar.forEach(alpha => {
  let buffer = Textfile.default.read('./src/data/' + alpha.index + '.csv', {async: false, json: false})
  if (buffer) {
    csv({
      noheader: true,
      headers: ["title", "description", "related", "details"],
      delimiter: [","],
      trim: true,
      alwaysSplitAtEOL: true
    })
    .fromString(buffer)
    .then(jsonObj => {
      if (jsonObj) {
        alpha.data = jsonObj
      } else {
        alpha.data = []
      }
      count--
      if(!count) {
        Textfile.default.write('./src/data/alphaBar.json', alphaBar)
      }
    })
  } else {
    alpha.data = []
    count--
    if(!count) {
      Textfile.default.write('./src/data/alphaBar.json', alphaBar)
    }
  }
})
