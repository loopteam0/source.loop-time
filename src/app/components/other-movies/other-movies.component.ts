import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MovieDbService } from "../../services/movie-db.service";
import { TorrentSearchApiService } from "../../services/torrent-search-api.service";
import { ElectronService } from "../../services/electron.service";
import { MatSnackBar } from '@angular/material';
import { DatePipe } from "@angular/common";
import { UiServiceService } from "src/app/services/ui-service.service";

let MovieTitle;
let movieYear;


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
  movieDetails;
  movies;
  Loop = "Loop For Movie";
  imageurl;
  errorState;
  try = 'the meg: retrun - home';

  constructor(
    public UI: UiServiceService,
    public dialogRef: MatDialogRef<OtherMoviesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private torrent: TorrentSearchApiService,
    private route: ActivatedRoute,
    private movieDB: MovieDbService,
    private electron: ElectronService,
    private snackbar: MatSnackBar,
    private datepipe: DatePipe
  ) {

    this.imageurl = "https://image.tmdb.org/t/p/w500";
  }

  ngOnInit() {
    this.Id = this.data['id'];
    this.showDetails();
  }

  showDetails() {
    this.loading = true;
    this.errorState = false;
    this.movieDB.getDetails(this.Id, "movie").subscribe(res => {
      this.movieDetails = res;
      this.loading = false;
      MovieTitle = this.movieDetails.title;
      movieYear = this.datepipe.transform(this.movieDetails.release_date, 'yyyy');
    this.errorState = false;
    }, err => {
    this.errorState = true;
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


  openDialog(title, date): void {

    const info:object ={
      title: title,
      date: date
    }

    this.UI.openDialog(info,OtherMovieDownloadDialogComponent, 'other-download-dialog' )

  }

  closeDialog(){
    this.dialogRef.close();
  }


  download(torrent) {
    this.torrent.downloadMagnet(torrent);
  }

  showError(err){
    this.snackbar.open(err);
  }
}

//
//
//
//
//
//
//
//
//
//
//
//
//

@Component({
  selector: 'download-dialog',
  templateUrl: './download-template/OtherMovieDownloadDialog.html',
  styleUrls : ['./OtherMovieDownloadDialog.scss']
})
export class OtherMovieDownloadDialogComponent implements OnInit {

  loading: boolean;
  movies: any;
  errorState: boolean;
  keyword = `${MovieTitle} ${movieYear}`;


  constructor(
    public dialogRef: MatDialogRef<OtherMovieDownloadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,public snackBar: MatSnackBar,
    private electron: ElectronService,
    private torrent: TorrentSearchApiService
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.showMovies();
  }

  openSnackBar(title: string) {
    this.snackBar.open(`Downloading ${title}` , 'close');
  }

  showMovies() {
    let val = this.keyword;
    let newKeyword = val.replace(/:|-/g, ' ');
    console.log(newKeyword);

    this.loading = true;
    this.errorState = false;

    this.torrent.getTorrents(newKeyword, 'Movies', 20).then(data => {
      this.movies = data;
      this.loading = false;
    },err => {
      this.loading = false;
      this.errorState = true;
      this.showError(err);
    });
  }

  showError(err: any): any {
    this.snackBar.open(err, null , {
      duration: 5000
    })
  }

  downloadTorrent(torrent) {
    this.torrent.downloadTorrent(torrent).then(() => {
      console.log("done");
    });
  }

  download(torrent) {
    this.openSnackBar(torrent.title)
    this.torrent.downloadMagnet(torrent);
  }

  // retry(){
  //   this.el.
  // }
}











