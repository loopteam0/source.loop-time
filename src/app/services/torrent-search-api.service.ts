import { Injectable } from '@angular/core';
import { TorrentSearch } from 'torrent-search-api';
import { ElectronService } from './electron.service';
import { retryWhen,  delay} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TorrentSearchApiService {
  torrentSearch:  typeof TorrentSearch;

  constructor(private electron: ElectronService) {
    if (this.electron.isElectron()) {
      this.torrentSearch = window.require('torrent-search-api');

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
    return throwError(error);
  }



 async getTorrents(title, cat, limit) {

  try {
    this.torrentSearch.enableProvider('1337x');
    let torrents = await this.torrentSearch.search( title, cat , limit);

    return torrents;
    } catch (error) {
        throwError(error);

      }
  }

  // async pirateBayTop(cat){
  //   const searchResults = await this.PirateBay.topTorrents(cat);

  //   return searchResults;
  //  }


  //  async pirateBaySearch( keyword , cat){
  //   const searchResults = await this.PirateBay.search( keyword , {
  //     category: cat,
  //     orderBy: 'seeds',
  //     sortBy: 'desc'
  //   })
  //   return searchResults;
  // }


 async downloadTorrent(torrent) {
    return await this.torrentSearch.downloadTorrent(
      torrent,
      'C:\\Users\\shadow\\Downloads\\Compressed'
    );
  }

  /* download torrent */
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
