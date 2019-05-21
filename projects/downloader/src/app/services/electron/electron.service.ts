import { Injectable } from '@angular/core';
import { ipcRenderer, shell,  webFrame, remote, BrowserWindow } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as TorrentSearch  from 'torrent-search-api';

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  shell: typeof shell;
  BrowserWindow: typeof BrowserWindow;
  TorrentSearch: typeof TorrentSearch;
   constructor() {
     // Conditional imports
     if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.shell = window.require('electron').shell;
      this.BrowserWindow = window.require('electron').BrowserWindow;
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.TorrentSearch = window.require('torrent-search-api')
    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

    test(){
       TorrentSearch.enableProvider('1337x');

       return TorrentSearch.search('1080', 'Movies', 5);
    }
}
