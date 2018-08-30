import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {  HttpClient, HttpErrorResponse , HttpParams } from '@angular/common/http';
import { Jsonp, JsonpModule , Response } from '@angular/http';
import { MoviesInt } from './interface';
 import { pipe } from 'rxjs';
 import { catchError, retry, retryWhen } from 'rxjs/operators';

 import { map, filter } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  /// movie
  yts_url = 'http://yts.am/api/v2/';
  yts_details = 'https://yts.am/api/v2/movie_details.json?';
  /// show
  eztv_url = 'https://eztv.ag/api/get-torrents?imdb_id=';
  base_url = 'https://tv-v2.api-fetch.website/';


  pop_url_rand = ' https://tv-v2.api-fetch.website/random/';

/*******************************************************************
  // TV_URL = 'https://eztv.ag/api/';
  /// TV_URL2 = 'https://eztv.is/api/';
  // PopCornAnimeURL = 'https://tv-v2.api-fetch.website/animes'
  // ref url params for popcornapi = '/animes/1?sort=rating&order=-1&genre=all&keywords=dragon';
  // ref MoviePageWithPaprms = 'https://tv-v2.api-fetch.website/movies/1?sort=rating&order=-1&genre=all&keywords=rampage';
  // ref RandomMovie = 'https://tv-v2.api-fetch.website/random/movie';
 *********************************************************************/

  constructor( private http: HttpClient, private jsonp: Jsonp ) { }

  /** increasing page */
  /* getPage( ) {
    return  this.http.get( this.pop_url + 'movies' );
    } */

    /**
     *  TODOs
     *  In the next version :
     *  setup eztv and yts;
     *  use the imdb_id to request availiable series form eztv;
     *  0timize api loading speed;
     */




  /** error handling */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      /* retryWhen( errors => error.delay(500)) */
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.status}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
/******** ******************/

  getMovies( pageNumber , pageSize ): Observable< MoviesInt[] > {
  return  this.http.get< MoviesInt[]>

  ( this.yts_url + 'list_movies.json?'
  + `limit=${pageSize}` + '&' + `order_by=desc` + '&' + `page=${pageNumber}` + '&' + `sort_by=download_count` )
  .pipe(
    // retry(3), // retry a failed request up to 3 times
    catchError(this.handleError) // then handle the error
  );

  }
  /* getMovies( pageNumber , pageSize ): Observable< MoviesInt[] > {
    return  this.jsonp.request( this.yts_url + 'list_movies.jsonp?'
    + `limit=${pageSize}` + '&' + `order_by=desc` + '&' + `page=${pageNumber}` + '&' + `sort_by=download_count&callback=JSONP_CALLBACK` )
    .pipe(
      // retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    } */

  /** GET DETAILS OF A MOVIE  */
  getMovieDetails( id ): Observable< MoviesInt[] > {
    return  this.http.get< MoviesInt[] >( this.yts_details + `movie_id=${id}` )
    .pipe(
      // retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    }

  getMoviesByKeyword(keyword): Observable< MoviesInt[] > {
    return  this.http.get< MoviesInt[] >( this.yts_url +
      'list_movies.json?' + `query_term=${keyword}` + '&' + `sort_by=download_count&limit=50` )
    .pipe(
      // retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    }



/*** GET TV SHOWS */
  getShows(showPage): Observable< MoviesInt[] > {
  return  this.http.get< MoviesInt[] >( this.base_url + `shows/` + `${showPage}` + `?sort=trending&order=-1&genre=all`)
  .pipe(
    // retry(3), // retry a failed request up to 3 times
    catchError(this.handleError) // then handle the error
  );

  }

  getShowDetails(imdb_id): Observable< MoviesInt[] > {
    return  this.http.get< MoviesInt[] >( this.base_url + `show/` + `tt${imdb_id}`)
    .pipe(
       retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

  }

  getShowEpisopse(imdb_id): Observable< MoviesInt[] > {
      return  this.http.get< MoviesInt[] >( this.eztv_url + `${imdb_id}` + `&limit=100`)
      .pipe(
         retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  getShowsByKeyword(keyword): Observable< MoviesInt[] > {
    return  this.http.get< MoviesInt[] >( this.base_url + `shows/` + `${1}` + `?sort=year&order=-1&genre=all` + `&keywords=${keyword}`)
    .pipe(
      // retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    }

 /** GET ANIMATIONS */
getAnimes(animePage): Observable< MoviesInt[] > {
  return  this.http.get< MoviesInt[] >( this.base_url + `animes/${animePage}?sort=trending&order=-1&genre=all` );

  }

/** GET SEARCH RESULTS */
/* getResults(): Observable< MoviesInt[] > {
  return  this.http.get< MoviesInt[] >( this.pop_url + 'animes/1?sort=year&order=-1&genre=all' );

  } */



























}

