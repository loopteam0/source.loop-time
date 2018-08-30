import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ParamMap } from "@angular/router";

import { MovieDbService } from "../../services/movie-db.service";
import { TorrentSearchApiService } from "../../services/torrent-search-api.service";
import { ElectronService } from "../../services/electron.service";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "app-other-movies",
  templateUrl: "./other-movies.component.html",
  styleUrls: ["./other-movies.component.scss"]
})
export class OtherMoviesComponent implements OnInit {
  loading;
  Moviesloading;
  parms;
  Id;
  details;
  movies;
  Loop = "Loop For Movie";
  imageurl;
  retry;
  try = 'the meg: retrun - home';
  
  constructor(
    private torrent: TorrentSearchApiService,
    private route: ActivatedRoute,
    private movieDB: MovieDbService,
    private electron: ElectronService,
    private snackbar: MatSnackBar
  ) {
   
    this.imageurl = "https://image.tmdb.org/t/p/w500";
  }

  ngOnInit() {
    // this the id of the movie form the route
    this.parms = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get("id");
      this.Id = id;
      console.log(this.Id);
    });

    this.showDetails();
  }

  showDetails() {
    this.loading = true;
    this.movieDB.getDetails(this.Id, "movie").subscribe(res => {
      this.details = res;
      this.loading = false;
    this.retry = false;
    }, err => {
    this.retry = true;
    this.loading = false;

    } );
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

  showMovies(keyword) {
    let val = keyword;
    let newKeyword = val.replace(/:|-/g, ' ');
    console.log(newKeyword);

    this.Loop = "Looping...";
    this.Moviesloading = true;
    this.torrent.getMovies(newKeyword, 25).subscribe(data => {
      this.movies = data;
      console.log(this.movies);
      this.Moviesloading = false;
      this.Loop = "Loop Again";
    },err => {
    this.showError();
    this.Moviesloading = false;
    this.Loop = 'Loop Again' 
    });
  }

  downloadTorrent(torrent) {
    this.torrent.downloadTorrent(torrent).subscribe(() => {
      console.log("done");
    });
  }

  download(torrent) {
    this.torrent.downloadMagnet(torrent);
  }

  showError(){
    this.snackbar.open('An error occured while Looping, Please Loop Again');
  }
}
