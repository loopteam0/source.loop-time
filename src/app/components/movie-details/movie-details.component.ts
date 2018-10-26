import { Component, OnInit, OnDestroy,Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { SearchService } from '../../services/search.service';
import { ElectronService } from '../../services/electron.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FanartTvService } from '../../services/fanart-tv.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

export interface DialogData {
  torrents: Array<any>;
  title_long: string;
  name: string;
}

export interface bgImages{
  id: number;
  url: string
}

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
  imdb_id;
  errorState = false;
  background: Array<object >;
  banner;

  constructor(
    public UI: UiServiceService,
    public dialogRef: MatDialogRef<MovieDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fanartApi: FanartTvService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private request: SearchService,
    public snackBar: MatSnackBar,
    private electron: ElectronService
  ) {}

  getmoviedetails() {
    // start the loadig spinner
    this.loading = true;
    this.errorState = false;
    // pass the movie id to the getMoviesDetails function
    this.request.getMovieDetails(this.Id).subscribe(data => {
      this.movieDetails = data['movie'];
      this.loading = false;
    this.errorState = false;
  }, err => {
      this.showError(err);
      this.errorState = true;
      this.loading = false;
  });

  }

  ngOnInit() {

    this.Id = this.data['id'];
    this.imdb_id = this.data['id'];

    this.getmoviedetails();
  }

  openDialog(data): void {
    const info:object = {
      title: this.movieDetails.title_long,
      files: this.movieDetails.torrents,
      torrents: this.movieDetails
    }

    this.UI.openDialog(info,MovieDownloadDialogComponent, 'movie-download-dialog' , 'auto' , 'auto' )

  }

  closeMe(){
    this.dialogRef.close();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(title: string, quality: string) {
    this.snackBar.open(`Downloading ${title} ${quality}`);
  }

  openSubtitle(url) {
    if (this.electron.isElectron()) {
      this.electron.shell.openExternal(
        `www.yifysubtitles.com/movie-imdb/${url}`
      );
    } else {
      window.open(`http://www.yifysubtitles.com/movie-imdb/${url}`);
    }
  }

  showImage(){
    this.fanartApi.getMovieImages(this.imdb_id, 'movies').subscribe(
      res => {
        this.background = res['moviebackground'];
        this.banner = res['moviebanner'];
        console.log(this.background);
        console.log(this.banner);

      }
    )
  }



  watchTrailer(code) {
    let url = `https://www.youtube.com/embed/${code}`;
    window.open(url);
  }

  showError(err){
    this.snackBar.open(err)
  }

  ngOnDestroy() {
  //  this.parms.unsubscribe();
  }


}

// /
// /
// /
// /
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
//


@Component({
  selector: 'download-dialog',
  templateUrl: './download-template/movie-download-dialog.html',
  styleUrls : ['./movie-download-dialog.scss']
})
export class MovieDownloadDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MovieDownloadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public snackBar: MatSnackBar,
   private electron: ElectronService
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(title: string, quality: string) {
    this.snackBar.open(`Downloading ${title} ${quality}` , 'close');
  }

  download(url){
    this.electron.shell.openItem(url);
  }

  // retry(){
  //   this.el.
  // }
}
