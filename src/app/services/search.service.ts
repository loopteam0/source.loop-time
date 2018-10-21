import { Observable, interval } from 'rxjs';
import { Injectable } from '@angular/core';
import {  HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Http ,  Jsonp } from '@angular/http';
import { MoviesInt } from './interface';
import { catchError, retry, retryWhen, debounceTime, delay, throttle } from 'rxjs/operators';

import { map, filter } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  /// movie
  yts_url = 'https://yts.am/api/v2/';

  /// show
  eztv_url = 'https://eztv.ag/api/get-torrents?imdb_id=';
  base_url = 'https://tv-v2.api-fetch.website';


/*
  tvmaze_url = 'https://api.tvmaze.com/';
  tv_ur = 'http://api.tvmaze.com/search/shows?q=';
  tv =     'http://api.tvmaze.com/shows/id(1)?embed=cast';
  search = 'http://api.tvmaze.com/updates/shows';
  index = 'http://api.tvmaze.com/shows?page=1';

 */

  loading;


  constructor(  private http: HttpClient, private jsonp: Jsonp) { }



    /**
     *  TODOs
     *  In the next version :
     *  0timize api loading speed in movies;
     */


  /** error handling */
  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
        retryWhen( errors => errors.pipe(delay(500)));
      console.error('An error occurred:', error.message);
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, body was: ${error.status}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }


/******** ******************/
  // ** String (title, year, rating, peers, seeds, download_count, like_count, date_added) */

   getMoviesList(pageNumber, pageSize): Observable<MoviesInt[]> {
     const url =  `${this.yts_url}list_movies.json?limit=${pageSize}&page=${pageNumber}`;
      return  this.http.get<MoviesInt[]>(url)
      .pipe(
        map(res => res['data']),
        retry(6), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }


  /** GET DETAILS OF A MOVIE  */
  getMovieDetails(id): Observable<MoviesInt> {
     const url = `${this.yts_url}movie_details.json?movie_id=${id}&with_images=true&with_cast=true`;
    return  this.http.get<MoviesInt>(url)
    .pipe(
      map(res => res['data']),
      retry(6), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    }
  getSimilarMovies(id): Observable<MoviesInt[]> {
     const url = `${this.yts_url}movie_suggestions.json?movie_id=${id}`;
    return  this.http.get(url)
    .pipe(
      map(res => res['data']),
      retry(6), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    }

  getMoviesByKeyword(keyword): Observable<MoviesInt[]> {
     const url = `${this.yts_url}list_movies.json?query_term=${keyword}&sort_by=download_count&limit=50`;
    return  this.http.get(url)
    .pipe(
      map(res => res['data']),
      catchError(this.handleError), // then handle the error
       retry(6) // retry a failed request up to 3 times
    );
    }


/* Possible values:  name , rating , released , trending , updated , year  */
/*** GET TV SHOWS */
  getShowsList(showPage): Observable<MoviesInt[]> {
    const url = `${this.base_url}/shows/${showPage}?sort=trending&order=-1&genre=all`;
  return  this.http.get<MoviesInt[]>(url)
  .pipe(
    retry(6), // retry a failed request up to 3 times
    catchError(this.handleError) // then handle the error
  );

  }

  getShowDetails(imdb_id): Observable<MoviesInt> {
    const url = `${this.base_url}/show/tt${imdb_id}`;
    return  this.http.get<MoviesInt>(url)
    .pipe(
       retry(6), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

  }

  getShowEpisopse(imdb_id , size, page): Observable<MoviesInt[]> {
      const url = `${this.eztv_url}${imdb_id}&limit=${size}&page=${page}`;
      return  this.http.get<MoviesInt[]>(url)
      .pipe(
         retry(6), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );

  }

  getShowsByKeyword(keyword): Observable<MoviesInt[]> {
    const url = `${this.base_url}/shows/1?sort=year&order=-1&genre=all&keywords=${keyword}`;
    return  this.http.get<MoviesInt[]>(url)
    .pipe(
      retry(6), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    }

 /** GET ANIMATIONS */
getAnimesList(animePage): Observable<MoviesInt[]> {
  const url = `${this.base_url}/animes/${animePage}?sort=trending&order=-1&genre=all`;
  return  this.http.get<MoviesInt[]>(url)
  .pipe(
    // retry(3), // retry a failed request up to 3 times
    catchError(this.handleError) // then handle the error
  );

  }

  getAnimeDetails(imdb_id): Observable<MoviesInt> {
    const url = `${this.base_url}/anime/${imdb_id}`;
    return  this.http.get<MoviesInt>(url)
    .pipe(
       retry(6), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

  }

  getAnimesByKeyword(keyword): Observable< MoviesInt[] > {
    const url = `${this.base_url}/animes/1?sort=year&order=-1&genre=all&keywords=${keyword}`;
    return  this.http.get<MoviesInt[]>(url)
    .pipe(
      retry(6), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    }

  getQuotes(): Observable<MoviesInt> {
    const url = `http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1`;
    return this.http.get<MoviesInt>(url).pipe(
        throttle(() => interval(500)),
      debounceTime(500),
      retry(10)
    );
  }






}

