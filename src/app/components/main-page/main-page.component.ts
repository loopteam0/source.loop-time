import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MovieDbService } from '../../services/movie-db.service';
import { OtherMoviesComponent } from '../other-movies/other-movies.component';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  public upcomingMovies;
  public Animes;
  public Shows;
  public Pages;
  loading;
  errorMsg = 'An unknown error occured while requesting';
  animePage;
  pgNumber;
  i;
  home;
  /** PAGINATION */
  lenght;
  pageSize = 20;
  pageIndex;
  pageSizeOptions = [20];
  imageurl;
  errorState: boolean;


  constructor(
    public UI: UiServiceService,
    private movieDB: MovieDbService,
    private snackBar: MatSnackBar,
  ) {
    this.imageurl = 'https://image.tmdb.org/t/p/w500';
  }

  
  ngOnInit() {
    this.showMoviesNowPlayingList(1);
  }


  /** Get upcoming Movies List from Yts */
  showMoviesNowPlayingList(i) {
    this.home = false;
    this.loading = true;
    this.errorState = false;
    this.movieDB.getNowPlaying(i).subscribe(
      res => {
        this.upcomingMovies = res['results'];
        this.lenght = res['total_results'];
        this.loading = false;
        this.errorState = false;
    }, err =>{
       this.showError(err);
       this.loading = false;
       this.errorState = true;
      });
  }

  retry(){
    this.home = false;
    this.showMoviesNowPlayingList(this.i)
  }


  openDialog(data): void {
    const info:object = {
      id: data
    }
    this.UI.openDialog(info ,OtherMoviesComponent ,'Download-dialog')

  }

  showError(err) {
  const errorSnackRef =  this.snackBar.open(err, 'retry', {
      duration: 5000,
    });
    errorSnackRef.onAction().subscribe(
      res => {
        this.showMoviesNowPlayingList(1);

      });
  }

  search(keyword){
    this.loading = true;
    this.errorState = false;
    this.home = true;
    this.movieDB.searchKeyword(keyword,'movie',1).subscribe(
      res => {
        this.upcomingMovies = res;
        this.loading = false;
        this.errorState = false;
        if (this.upcomingMovies.length == 0) {
          this.showError(`${keyword} Not Found`)
        } else {
          this.showError(`${this.upcomingMovies.length} Items Found`)
        }
      },err =>{
        this.loading = false;
        this.errorState = false;
        this.showError(err);
      }
    )
  }

  Page(e, cat) {
    this.loading = true;
    this.errorState = false;
    this.i = (e.pageIndex+1);
    this.movieDB.getNowPlaying(e.pageIndex+1).subscribe(
      res => {
        this.errorState = false;
        this.loading = false;
        this.upcomingMovies = res['results'];
    }, err =>{
      this.loading = false;
      this.errorState = true;
       this.showError(err);

      });
  }


  // onSelectMovie(movie) {
  //   this.router.navigate(['/trending/movies/', movie.id]);
  // }

  opensnackbar(index, cat) {
    this.snackBar.open(`${cat}: Page ${index} is loading please Wait . . . `);
  }

  errorSnack() {
    this.snackBar.open(`An unknown error occured`);
  }




  ngOnDestroy(){

  }
}
