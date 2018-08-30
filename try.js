const TorrentSearchApi = require('torrent-search-api');

TorrentSearchApi.enableProvider('Rarbg');
// Search '1080' in 'Movies' category and limit to 20 results
let all;

async function getTorrents() {     
return await
TorrentSearchApi.search('deadpool', 'Movies', 10); 

}

function display(){
 let t = getTorrents();

 console.log(t);
}

