const PirateBay = require('thepiratebay');

PirateBay.search('rampage', {
  category: 200
})
.then(results => console.log(results))
.catch(err => console.log(err))