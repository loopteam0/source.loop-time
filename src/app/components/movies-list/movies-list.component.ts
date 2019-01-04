import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { FanartTvService } from '../../services/fanart-tv.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, OnDestroy,AfterViewInit {

  public Movies;
  public Pages;
  errorState = false;
  moviesLoading;
  selectedValue: string;
  background;
  banner;
  home = false;
  searchLt:any;
  
  subscribe: Subscription;
  typeAhead: Subscription;
  @ViewChild('input') searchInput:NgModel;
  
  // pagination
  length;
  pageSize = 50;
  pageIndex;
  pageSizeOptions = [50, 30, 10];
  retryIndex;
  pagination: boolean = true;


  constructor(
    public UI: UiServiceService,
    private request: SearchService,
    private router: Router,
    private fanartApi: FanartTvService
  ) {}

  ngOnInit() {
    this.requestMoviesList(1);

    this.typeAhead = this.searchInput.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe( val => {
      console.log('hi from viewInit');
        this.search(val);  
              
    }, (err) => {
      this.openSnackbar(err + 'Somthing Bad Happend, Try Again')      
    })
  }


  ngAfterViewInit(){
   
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
      this.openSnackbar(err);
      this.errorState = true;
      this.moviesLoading = false;
      this.pagination = false;

  });

  }




   search(keyword:string) {
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
         this.openSnackbar(`Nothing Found`);
       }else {
         this.openSnackbar(`${this.length} Results Found`);
       }
      }, err => {
        this.openSnackbar(err);
        this.moviesLoading = false;
      });
  } 

  paginate(e:any) {
    this.retryIndex = (e.pageIndex + 1);
      this.moviesLoading = true;
      this.pagination = true;
      this.errorState = false;
      this.openSnackbar(`Page ${e.pageIndex + 1} Is Loading`);

    this.subscribe = this.request.getMoviesList((e.pageIndex + 1), e.pageSize)
        .subscribe(
          data => {
           this.Movies = data['movies'];
           this.length = data['movie_count'];
           this.moviesLoading = false;
            this.errorState = false;
        }, err => {
          this.openSnackbar(err);
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


  openSnackbar(msg) {
    this.UI.openSnackBar(msg);
  }

  ngOnDestroy(): void {
    this.typeAhead.unsubscribe();
    this.subscribe.unsubscribe();
  }
}
