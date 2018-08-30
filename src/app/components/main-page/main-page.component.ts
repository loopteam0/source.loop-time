import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MovieDbService } from '../../services/movie-db.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public Movies;
  public MoviesNowPlaying;
  public showsAiringToday;
  public topRatedShows;
  public UpcomigMovies;    
  public Animes;
  public Shows;
  public Pages;

  animesLoading;
    
  NewMoviesLoading; 
//  moviesLoading;
  showsLoading;
  moviesLoading;
  errorMsg = 'An unknown error occured while requesting';

  animePage;
  pgNumber;
  /** PAGINATION */
  length = 200;
  pageSize = 20;
  pageIndex;
  pageSizeOptions = [20];
  imageurl;
  /*image url example
  https://image.tmdb.org/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg
  backdrop otptions
  "w300",
  "w780",
  "w1280",
  "original"

  poster
  "w92",
  "w154",
  "w185",
  "w342",
  "w500",
  "w780",
  "original"*/

  constructor(
    private movieDB: MovieDbService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.imageurl = 'https://image.tmdb.org/t/p/w500';
    this.showsLoading = true;
    this.moviesLoading = true;
  }

  time = timer(2000);
  ngOnInit() {

 //this.showUpcomingMovies(1);
      
    this.showTopRatedList(1);

    this.showMoviesNowPlayingList(1);

    this.showAiringTodayList(1);

    this.showTopRatedShowsList(1);
  }

  /** Get Movies List from Yts */
  showTopRatedList(i) {
    this.movieDB.getTopRated('movie', i).subscribe(
      res => {
        this.Movies = res['results'];
      }, err => this.showError(err));
  }
  /** Get upcoming Movies List from Yts */
  showUpcomingMovies(i) {
    this.movieDB.getUpcoming(i).subscribe(
      res => {
        this.UpcomigMovies = res['results'];
      }, err => { this.showError(err)});
  }


  showMoviesNowPlayingList(i) {
    this.movieDB.getNowPlaying(i).subscribe(
      res => {
        this.MoviesNowPlaying = res['results'];
    }, err => this.showError(err));
  }


  showAiringTodayList(i) {
    this.movieDB.getAiringToday('tv', i).subscribe(
      res => {
        this.showsAiringToday = res['results'];
    }, err => this.showError(err));
  }

  showTopRatedShowsList(i) {
    this.movieDB.getTopRated('tv', i).subscribe(
      res => {
        this.topRatedShows = res['results'];
    }, err => this.showError(err));
  }


  opensnackbar(index, cat) {
    this.snackBar.open(`${cat}: Page ${index} is loading please Wait . . . `);
  }


  errorSnack() {
    this.snackBar.open(`An unknown error occured`);
  }
  
  showError(data) {
  const errorSnackRef =  this.snackBar.open(data, 'retry', {
      duration: 50000,
    });

    errorSnackRef.onAction().subscribe(
      res => {
        this.showTopRatedList(1);

        this.showMoviesNowPlayingList(1);

        this.showAiringTodayList(1);

        this.showTopRatedShowsList(1);
      }); 
  
  }


  // paginations with angular material

  Page(e, cat) {
    switch (cat) {
      case 'Upcoming Movies':
        this.opensnackbar((e.pageIndex + 1), cat);
         this.showUpcomingMovies((e.pageIndex + 1));

        break;
        
        case 'Most Rated Movies':
        this.opensnackbar((e.pageIndex + 1), cat);
        this.showTopRatedList((e.pageIndex + 1));

        break;

      case 'New Movies':
        this.opensnackbar((e.pageIndex + 1), cat);
        this.showMoviesNowPlayingList((e.pageIndex + 1));

        break;

      case 'Tv Shows Airing today':
        this.showAiringTodayList((e.pageIndex + 1));
        this.opensnackbar((e.pageIndex + 1), cat);

        break;

      case 'Top Rated Shows':
        this.showTopRatedShowsList((e.pageIndex + 1));
        this.opensnackbar((e.pageIndex + 1), cat);

        break;
      default:
        this.errorSnack();
    }
  }


  onSelectMovie(movie) {
    this.router.navigate(['/trending/movies/', movie.id]);

  }
  onSelectShow(show) {
    this.router.navigate(['/trending/shows/', show.id]);
  }


  navigateTop() {
    window.scrollTo(0, 0);
  }
}
