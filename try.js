const KatApi = require('kat-api-pt')

const kat = new KatApi({
  baseUrl :'https://katcr.co/'
})

kat.search(
  'adobe',
  ).then(res => console.log(res))
  .catch(err => console.error(err));
