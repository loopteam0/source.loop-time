const TorrentSearchApi = require('torrent-search-api');
 


 async function getAll() {
 TorrentSearchApi.enableProvider('1337x');
 
  let torrents = await TorrentSearchApi.search( '1080p', 'Movies', 20);

 console.log(torrents);
 
}
getAll();