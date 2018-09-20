import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { SearchService } from '../../services/search.service';
import { ElectronService } from '../../services/electron.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movieDetails;
  Id;
  loading: boolean;
  video;
  parms;
  errorState = false;
  constructor(
    private route: ActivatedRoute,
    private request: SearchService,
    public snackBar: MatSnackBar,
    private electron: ElectronService
  ) {}

  getmoviedetails() {
    // start the loadig spinner
    this.loading = true;
    // pass the movie id to the getMoviesDetails function
    this.request.getMovieDetails(this.Id).subscribe(data => {
      this.movieDetails = data;
      this.loading = false;
    this.errorState = false;
  }, err => {
      this.errorState = true;
      this.loading = false;
  });
    
  }

  ngOnInit() {
    // this the id of the movie form the route
    this.parms = this.route.paramMap.subscribe((params: ParamMap) => {
      const imdb_id = params.get('imdb_id');
      this.Id = imdb_id;
    });

    this.getmoviedetails();
  }

  openSnackBar(title: string, quality: string) {
    this.snackBar.open(`Downloading ${title} ${quality}` , 'close');
  }

  opensubtitle(url) {
    if (this.electron.isElectron()) {
      this.electron.shell.openExternal(
        `www.yifysubtitles.com/movie-imdb/${url}`
      );
    } else {
      window.open(`http://www.yifysubtitles.com/movie-imdb/${url}`);
    }
  }

  openTrailer(code) {
    let url = `https://www.youtube.com/embed/${code}`;
          window.open(url);
  }

  showError(err){
    this.snackBar.open(err)
  }

  ngOnDestroy() {
    this.parms.unsubscribe();
  }


}
