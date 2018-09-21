import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SearchService } from '../../services/search.service';
import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  public Movies;
  public Pages;
  errorState = false;
  moviesLoading;
  retryIndex = 1;
  pagination: boolean = true;
  length;
  pageSize = 50;
  pageIndex;
  pageSizeOptions = [50, 30, 10];



  constructor(
    private el: ElementRef,
    private request: SearchService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.requestMoviesList(1);
  }
 /** Get Movies List from Yts */
  requestMoviesList(i) {
    this.moviesLoading = true;
    this.pagination = false;
    this.request.getMoviesList(i, 50).subscribe(data => {
      this.Movies = data['movies'];
      this.length = data['movie_count'];
      this.moviesLoading = false;
      this.errorState = false;
      this.pagination = true;
  }, err => {
      this.showError(err);
      this.errorState = true;
      this.moviesLoading = false;
      this.pagination = false;

  });

  }

  search(keyword) {
    this.moviesLoading = true;
    this.pagination = false;
    this.request.getMoviesByKeyword(keyword).subscribe(
     data => {
       this.moviesLoading = false
       this.Movies = data['movies'];
      }, err => {
        this.showError(`Unknown Error Occured while searching Try Searching Again`);
        this.moviesLoading = false;
        this.pagination = true;
      })

  }

  paginate(e , cat ) {
    this.retryIndex = (e.pageIndex+ 1);
      this.moviesLoading = true;  
      this.pagination = true;
      this.errorState = false;
      this.opensnackbar((e.pageIndex + 1), cat);
      this.request.getMoviesList((e.pageIndex + 1), e.pageSize)
        .subscribe(
          data => {
           this.Movies = data['movies'];
           this.moviesLoading = false;
            this.errorState = false;
        }, err => { 
          this.showError(err);
          this.errorState = true;
          this.moviesLoading = false;
          
        });
     
  }


  RETRY(){
    this.errorState = false;
    this.requestMoviesList(this.retryIndex);
  }
 
  onSelectMovie(item) {
    this.router.navigate(['/movies', item.id, item.imdb_code]);
  }

  opensnackbar(index, cat) {
    this.snackBar.open(`${cat}: Page ${index} is loading please Wait . . . `);
  }
  opensnack(cat) {
    this.snackBar.open(`Page 0 doesn't exist for ${cat}`);
  }



  showError(err){
    this.snackBar.open(err , '' , {
      duration: 5000
    });
  }

  navigateTop() {
   window.scrollTo(0,0)
  }
}
