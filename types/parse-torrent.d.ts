export = index;
declare function index(torrentId: any): any;
declare namespace index {
  function remote(torrentId: any, cb: any): void;
  function toMagnetURI(obj: any): any;
  function toTorrentFile(parsed: any): any;
}
