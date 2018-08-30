import { SearchService } from '../../services/search.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { catchError } from 'rxjs/operators';

export interface Category {
  name: string;
  value: string;
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  moviesResults: Observable<Array<any>> ;
  showsResults: Observable<Array<any>> ;
  animesResults: Observable<Array<any>> ;
  loadingAnimes = false;
  loadingMovies = false;
  loadingShows = false;
  error = true;
  hint: string;
  Keyword;
  showspinner = false;
  loading;
  test;
  searchField: FormControl;
  isHidden;
  showsReturned;
  moviesReturned;
  constructor(private request: SearchService, private snackBar: MatSnackBar,
    private router: Router) {
      this.isHidden = true;
     }

  search(keyword) {
    this.beginSearchSnackBar(keyword);
    this.loadingAnimes = true;
    this.loadingMovies = true;
    this.loadingShows = true;

    this.moviesResults = this.request.getMoviesByKeyword(keyword).pipe(
      tap(() => {
      this.loadingMovies = false;
      this.openSnackBar('Movies' , keyword);
      this.isHidden = false;
    })
      );

    this.showsResults = this.request.getShowsByKeyword(keyword).pipe(   
      tap(() => {
        this.loadingShows = false;
        this.openSnackBar('Shows', keyword);
      }));
  }


  ngOnInit() {}

  beginSearchSnackBar(keyword) {
    this.snackBar.open(`Searching Database for "${keyword}" . . . `, 'close');
  }

  openSnackBar(category, keyword) {
    this.snackBar.open(`${category}: "${keyword}" search completed . . . ` , 'successfully');

  }

  erroSearchSnackBar(keyword) {
    this.snackBar.open(`"${keyword}" search completed . . . completed with an ` , 'error');
  }

  showError(err){
    this.snackBar.open(err);
  }


  onSelectMovie(item) {
    this.router.navigate(['/movies', item.id]);
  }

  onSelectShow(show) {
    this.router.navigate(['/shows', show.imdb_id]);
  }

goToOtherPage() {
  this.router.navigate(['/trending']);
}

hideAlert() {
  this.isHidden = true;
}

}
