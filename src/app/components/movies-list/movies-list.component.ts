import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SearchService } from '../../services/search.service';
import { tap } from 'rxjs/operators';
import { FanartTvService } from '../../services/fanart-tv.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, OnDestroy {

  public Movies;
  public Pages;
  errorState = false;
  moviesLoading;
  subscribe: Subscription;
  retryIndex;
  pagination: boolean = true;
  selectedValue: string;
  length;
  pageSize = 50;
  pageIndex;
  pageSizeOptions = [50, 30, 10];
  background;
  banner;
  home = false;
  searchLt:any;
  generes: Array<object> = [{name:'Cartoons', value: 'Cartoons'},{name: 'Action', value: 'Action'}, {name:'War', value:'War'}];

  constructor(
    public UI: UiServiceService,
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
    this.subscribe = this.request.getMoviesList(i, 50).subscribe(data => {
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

  search(keyword: string) {
    this.moviesLoading = true;
      this.errorState = false;
      this.home = true;
      this.pagination = false;
    this.subscribe = this.request.getMoviesByKeyword(keyword).subscribe(
     data => {
       this.moviesLoading = false;
       this.Movies = data['movies'];
       this.length = data['movie_count'];

       if (this.length == 0) {
         this.showError(`${keyword} Not Found`);
       }else {
         this.showError(`${this.length} Results Found`);
       }
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
    this.subscribe = this.request.getMoviesList((e.pageIndex + 1), e.pageSize)
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
    const info:object = {
      id: data
    }
    this.UI.openDialog(info , MovieDetailsComponent, 'Download-dialog');

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
    this.UI.openSnackBar(`${cat}: Page ${index} is loading please Wait . . . `);
  }


  showError(msg){
    this.UI.openSnackBar(msg)
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribe.unsubscribe();
  }
}
