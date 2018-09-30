import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { TorrentSearch } from '../../assets/providers/torrent-search-api';
import { ElectronService } from './electron.service';
import { PirateBay  } from 'thepiratebay';
import {
  catchError,
  retry,
  retryWhen,
  debounceTime,
  delay,
  throttle
} from 'rxjs/operators';
import { map, startWith, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TorrentSearchApiService {
  torrentApi: typeof TorrentSearch;
  torrentSearch:  typeof TorrentSearch;
  PirateBay: typeof PirateBay ;

  constructor(private electron: ElectronService) {
    if (this.electron.isElectron()) {
      this.torrentApi = window.require('torrent-search-api');
      this.torrentSearch = window.require('torrent-search-api');
      this.PirateBay = window.require('thepiratebay');

    } else{
    console.log('Not an electron app');
    }
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      retryWhen(errors => errors.pipe(delay(1000)));
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, body was: ${error.status}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened, Check internet connection and retry.');
  }


 async getAnimes(title, limit) {
    this.torrentSearch.enableProvider('1337x');
    this.torrentSearch.enableProvider('Rarbg');
    let torrents = await this.torrentSearch.search( title, 'Anime', limit);

    return torrents;
  }

 async  getGames(title, limit) {
    this.torrentSearch.enableProvider('1337x');
    this.torrentSearch.enableProvider('Rarbg');
    let torrents = await  this.torrentSearch.search(['1337x','Rarbg'], title,'Games',limit);

    return torrents;
  } //

 async getSoftwares(title, limit) {
    this.torrentSearch.enableProvider('1337x');
    this.torrentSearch.enableProvider('Rarbg');

    const torrents = await this.torrentSearch.search(['Rarbg', '1337x'],title,'Applications',limit);

    return torrents;
  }

 async getMusics(title, limit){
    this.torrentSearch.enableProvider('1337x');
    this.torrentSearch.enableProvider('Rarbg');

    const torrents = await this.torrentSearch.search(['Rarbg', '1337x'], title, 'Music', limit);

    return torrents;
  }


 async pirateBaySearch( keyword , cat){
    const searchResults = await this.PirateBay.search( keyword , {
      category: cat,
      orderBy: 'seeds',
      sortBy: 'desc'
    })
    return searchResults;
  }

  async  getOthers(title, limit) {
    this.torrentSearch.enableProvider('1337x');
    this.torrentSearch.enableProvider('Rarbg');
    console.log(this.torrentSearch.getActiveProviders());

    const torrents = await this.torrentSearch.search(['Rarbg', '1337x'], title, 'Other', limit);

    return torrents;
  }

 async pirateBayTop(cat){
  const searchResults = await this.PirateBay.topTorrents(cat);

  return searchResults;
 }




  // 'ThePirateBay', '1337x',
//
  //

  //

  //
 async getTVShows(title, limit) {
    this.torrentSearch.enableProvider('1337x');
    this.torrentSearch.enableProvider('Rarbg');

    console.log(this.torrentSearch.getActiveProviders());

    const torrents = await this.torrentSearch.search(['1337x', 'Rarbg'], title, 'TV', limit);

    return torrents;
  }

 async getMovies(title, limit) {
    this.torrentSearch.enableProvider('1337x');
    this.torrentSearch.enableProvider('Rarbg');

    console.log(this.torrentSearch.getActiveProviders());

    const torrents = await this.torrentSearch.search(['Rarbg', '1337x'], title, 'Movies', limit );

    return torrents;
  }

 async downloadTorrent(torrent) {
    return await this.torrentSearch.downloadTorrent(
      torrent,
      'C:\\Users\\shadow\\Downloads\\Compressed'
    );
  }

 async downloadMagnet(torrent) {
   await this.torrentSearch
      .getMagnet(torrent)
      .then(magnet => {
     this.electron.shell.openExternal(magnet);
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

}
