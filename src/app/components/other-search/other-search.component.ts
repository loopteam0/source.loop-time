import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

/* import { pipe, Observable } from 'rxjs';
import { map, retryWhen } from 'rxjs/operators'; */

import { SearchService } from '../../services/search.service';
import { MovieDbService } from '../../services/movie-db.service';
import { DomSanitizer } from '@angular/platform-browser';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-other-search',
  templateUrl: './other-search.component.html',
  styleUrls: ['./other-search.component.scss']
})
export class OtherSearchComponent implements OnInit {


 showResults: Observable<Array<any>>;
 movieResults: Observable<Array<any>>;
 imageurl;
 movieLoading;
 showLoading;

    constructor(
       private movieDB: MovieDbService,
      private request: SearchService,
      private snackBar: MatSnackBar,
      private router: Router,
      private sanitizer: DomSanitizer
    ) {

    this.imageurl = 'https://image.tmdb.org/t/p/w500';
     }

  ngOnInit() {
  }
  search(keyword) {
    this.movieLoading = true;
    this.showLoading = true;

    this.movieResults = this.movieDB.searchKeyword(keyword, 'movie', 1).pipe(
      tap(() => {
          this.movieLoading = false;
        }));

    this.showResults = this.movieDB.searchKeyword(keyword, 'tv', 1).pipe(
      tap(() => {
          this.showLoading = false;
        }));

  }

  onSelectMovie(movie) {
    this.router.navigate(['/trending/movies/', movie.id]);

  }
  onSelectShow(show) {
    this.router.navigate(['/trending/shows/', show.id]);
  }
}
