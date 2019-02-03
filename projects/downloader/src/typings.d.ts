/* SystemJS module definition */
declare var nodeModule: NodeModule;
interface NodeModule {
  id: string;
}

declare var window: Window;
declare module 'torrent-search-api'
//declare var global: any;
interface Window {
  process: any;
  require: any;
}
