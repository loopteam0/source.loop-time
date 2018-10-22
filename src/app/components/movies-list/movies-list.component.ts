import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SearchService } from '../../services/search.service';
import { tap } from 'rxjs/operators';
import { FanartTvService } from '../../services/fanart-tv.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

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
  retryIndex;
  // tslint:disable-next-line:no-inferrable-types
  pagination: boolean = true;
  length;
  pageSize = 50;
  pageIndex = 1;
  pageSizeOptions = [50, 30, 10];
  background;
  banner;
  home = false;


  constructor(
    public dialog: MatDialog,
    private el: ElementRef,
    private request: SearchService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fanartApi: FanartTvService
  ) {}

  ngOnInit() {
    this.requestMoviesList(1);
  }
 /** Get Movies List from Yts */
  requestMoviesList(i) {
    this.home = false;
    this.moviesLoading = true;
    this.errorState = false;
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
      this.errorState = false;
      this.home = true;
      this.pagination = false;
    this.request.getMoviesByKeyword(keyword).subscribe(
     data => {
       this.moviesLoading = false;
       this.Movies = data['movies'];
       this.length = data['movie_count'];

      }, err => {
        this.showError(err);
        this.moviesLoading = false;
      });
  }

  paginate(e , cat ) {
    this.retryIndex = (e.pageIndex + 1);
      this.moviesLoading = true;
      this.pagination = true;
      this.errorState = false;
      this.opensnackbar((e.pageIndex + 1), cat);
      this.request.getMoviesList((e.pageIndex + 1), e.pageSize)
        .subscribe(
          data => {
           this.Movies = data['movies'];
           this.length = data['movie_count'];
           this.moviesLoading = false;
            this.errorState = false;
        }, err => {
          this.showError(err);
          this.errorState = true;
          this.moviesLoading = false;

        });

  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(MovieDetailsComponent, {
      data: {
        id: data
      },
      height: '95vh',
     // maxHeight: '95vh',
      width: '90vw',
     // maxWidth: '90vw',
      panelClass: 'Download-dialog',
      restoreFocus: false,
      autoFocus: false,
      id: 'Download-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  RETRY(){
    this.home = false;
    this.errorState = false;
    this.requestMoviesList(this.retryIndex);
  }

  onSelectMovie(item) {
    this.router.navigate(['/movies', item.id, item.imdb_code]);
  }

  opensnackbar(index, cat) {
    this.snackBar.open(`${cat}: Page ${index} is loading please Wait . . . `);
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
