import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { MoviesInt } from './interface';
import { catchError, retry, retryWhen, debounceTime, delay, throttle } from 'rxjs/operators';
import { map, filter } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';


// import { * } as TraktTv from 'trakt.tv';
export interface bgImages{
  id: number;
  url: string
}

@Injectable({
  providedIn: 'root'
})
export class FanartTvService {

  baseUrl = 'http://webservice.fanart.tv/v3';
  apiKey = '801f3cd00477b961043fdecf4f41dd59';
  apiKey1 = '9835c7b65e0db4c3c367c14c9b596483';
  // http://assets.fanart.tv/fanart/movies/145220/hdmovielogo/muppets-most-wanted-53c1385817504.png
  // http://webservice.fanart.tv/v3/movies/17645?api_key=6fa22b0ef3b5f3bba6a7edaa76675ac2&client_key=52c813aa7b8c8b3bb87f4797532a2f8c
  constructor(
   private http: HttpClient
  ) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      retryWhen(errors => errors.pipe(delay(500)));
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, body was: ${error.status}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened, check internet connection and retry.');
  }

  // tslint:disable-next-line:one-line
  getMovieImages(id , type):Observable<bgImages[]>{
    let url = `${this.baseUrl}/${type}/${id}?api_key=${this.apiKey1}`;

   let request = this.http.get<bgImages[]>(url).pipe(
    retry(2),
    catchError(this.handleError)
   )

   return request;
  }


}
