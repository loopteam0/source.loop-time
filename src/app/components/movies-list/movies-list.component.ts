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
  retry = false;
  moviesLoading;
  retryIndex = 1;

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
    this.request.getMoviesList(i, 50).subscribe(data => {
      this.Movies = data['movies'];
      this.length = data['movie_count'];
      this.moviesLoading = false;
      this.retry = false;
  }, err => {
      this.showError(err);
      this.retry = true;
      this.moviesLoading = false;
  });

  }

  RETRY(){
    this.requestMoviesList(this.retryIndex);
    console.log(this.retryIndex);
  }

  onSelectMovie(item) {
    this.router.navigate(['/movies', item.id]);
  }

  opensnackbar(index, cat) {
    this.snackBar.open(`${cat}: Page ${index} is loading please Wait . . . `);
  }
  opensnack(cat) {
    this.snackBar.open(`Page 0 doesn't exist for ${cat}`);
  }


  paginate(e , cat ) {
    this.retryIndex = (e.pageIndex+ 1);
      this.moviesLoading = true;  
      this.opensnackbar((e.pageIndex + 1), cat);
      this.request.getMoviesList((e.pageIndex + 1), e.pageSize)
        .subscribe(
          data => {
           this.Movies = data['movies'];
           this.moviesLoading = false;
            this.retry = false;
        }, err => { 
          this.showError(err);
          this.retry = true;
          this.moviesLoading = false;
        });
     
  }

  showError(err){
    this.snackBar.open(err);
  }

  navigateTop() {
   window.scrollTo(0,0)
  }
}
