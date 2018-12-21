import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SearchService } from '../../services/search.service';
import { FanartTvService } from '../../services/fanart-tv.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Subscription, fromEvent } from 'rxjs';
import { map, debounceTime, tap, switchMap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, OnDestroy, AfterViewInit {

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
  @ViewChild('input') searchInput:ElementRef;

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

  ngAfterViewInit(){

    this.subscribe = fromEvent(this.searchInput.nativeElement, 'keyup')
    .pipe(
      debounceTime(2000),
      map((event:Event) => (<HTMLInputElement>event.target).value),
      distinctUntilChanged(),
      tap(()=>{
        this.moviesLoading = true;
        this.errorState = false;
        this.home = true;
        this.pagination = false;
      }),
      switchMap((value) =>
          this.request.getMoviesByKeyword(value)
        )).subscribe( data => {
          this.moviesLoading = false;
          this.Movies = data['movies'];
          this.length = data['movie_count'];
   
          if (this.length == 0) {
            this.showError(` Nothing Found`);
          }else {
            this.showError(`${this.length} Results Found`);
          }
         }, (err: any) => {
           this.showError(err);
           this.moviesLoading = false;
        })

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




  /* search(keyword) {
    console.log(keyword);
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
         this.showError(`Nothing Found`);
       }else {
         this.showError(`${this.length} Results Found`);
       }
      }, err => {
        this.showError(err);
        this.moviesLoading = false;
      });
  } */

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
    this.UI.openSnackBar(`${index} loading`);
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
