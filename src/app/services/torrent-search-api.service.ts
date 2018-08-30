import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { TorrentSearchApi } from 'torrent-search-api';
import { ElectronService } from './electron.service';
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
  torrentApi: typeof TorrentSearchApi;
  torrentSearch;

  constructor(private electron: ElectronService) {
    if (this.electron.isElectron()) {
      this.torrentApi = window.require('torrent-search-api');
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


  getMusics(title, limit): Observable<any> {
    this.torrentSearch = new this.torrentApi();
    this.torrentSearch.enableProvider('1337x');
    this.torrentSearch.enableProvider('ThePirateBay');
      
    const loop = from(
      this.torrentSearch.search(['ThePirateBay', '1337x'],
         title, 'Music', limit)).pipe(
         retry(2), // retry a failed request up to 3 times
         catchError(this.handleError) // then handle the error
      );
    return loop;
  }
  //
  // 'ThePirateBay', '1337x',
  getSoftwares(title, limit) {
    this.torrentSearch = new this.torrentApi();
    this.torrentSearch.enableProvider('1337x');
    this.torrentSearch.enableProvider('ThePirateBay');

    console.log(this.torrentSearch.getActiveProviders());

    const loop = from(
      this.torrentSearch.search(['ThePirateBay', '1337x'],
        title,'Applications',limit)).pipe(
        retry(2), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
    );
    return loop;
  }
  //
  //
  getAnimes(title, limit) {
    this.torrentSearch = new this.torrentApi();
    this.torrentSearch.enableProvider('1337x');
    console.log(this.torrentSearch.getActiveProviders());

    const loop = from(
      this.torrentSearch.search(['1337x'], title, 'Anime', limit)
      ).pipe(
        retry(2), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    return loop;
  }
  //
  //
  getOthers(title, limit) {
    this.torrentSearch = new this.torrentApi();
    this.torrentSearch.enableProvider('1337x');
    this.torrentSearch.enableProvider('ThePirateBay');
    console.log(this.torrentSearch.getActiveProviders());

    const loop = from(
      this.torrentSearch.search(['ThePirateBay', '1337x'],
      title, 'Other', limit)).pipe(
        retry(2), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

    return loop;
  } //
  //
  getGames(title, limit) {
    this.torrentSearch = new this.torrentApi();
    this.torrentSearch.enableProvider('1337x');
    this.torrentSearch.enableProvider('ThePirateBay');

    console.log(this.torrentSearch.getActiveProviders());

    const loop = from(
      this.torrentSearch.search(['ThePirateBay', '1337x'],
       title,'Games',limit)).pipe(
        retry(2), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    return loop;
  } //
  //

  //
  getTVShows(title, limit) {
    this.torrentSearch = new this.torrentApi();
    this.torrentSearch.enableProvider('1337x');
    this.torrentSearch.enableProvider('ThePirateBay');

    console.log(this.torrentSearch.getActiveProviders());

    const loop = from(
      this.torrentSearch.search(['1337x', 'ThePirateBay'], title, 'TV', limit)
    );
    return loop;
  }

  getMovies(title, limit) {
    this.torrentSearch = new this.torrentApi();
    this.torrentSearch.enableProvider('ThePirateBay');
    this.torrentSearch.enableProvider('1337x');
    
    console.log(this.torrentSearch.getActiveProviders());

    const loop = from(
      this.torrentSearch.search(['ThePirateBay', '1337x'],
        title, 'Movies', limit )).pipe(
        retry(2), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

    return loop;
  }

  downloadTorrent(torrent) {
    return this.torrentSearch.downloadTorrent(
      torrent,
      'C:\\Users\\shadow\\Downloads\\Compressed'
    );
  }

  downloadMagnet(torrent) {
    this.torrentSearch
      .getMagnet(torrent)
      .then(magnet => {
        this.electron.shell.openExternal(magnet);
      })
      .catch(err => {
        console.log(err);
      });
  }

}
