import { Component, OnInit, OnDestroy,Inject } from '@angular/core';
import { ActivatedRoute, UrlHandlingStrategy } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SearchService } from '../../services/search.service';
import { ElectronService } from '../../services/electron.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FanartTvService } from '../../services/fanart-tv.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Subscription } from 'rxjs';

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
  subscribe: Subscription;
  Id;
  loading: boolean;
  imdb_id;
  errorState = false;
  background;
  banner;

  constructor(
    public UI: UiServiceService,
    public dialogRef: MatDialogRef<MovieDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fanartApi: FanartTvService,
    private request: SearchService,
    public snackBar: MatSnackBar,
  ) {}

  getmoviedetails() {
    // start the loadig spinner
    this.loading = true;
    this.errorState = false;
    // pass the movie id to the getMoviesDetails function
  this.subscribe = this.request.getMovieDetails(this.Id).subscribe(data => {
      this.movieDetails = data['movie'];
      this.loading = false;
      this.errorState = false;
  }, err => {
      this.openSnackBar(err);
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
    this.UI.openDialog(info,MovieDownloadDialogComponent , 'movie-download-dialog' , 'auto' , 'auto', false )
  }

  closeMe(){
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(title: string, quality?: string) {
    this.UI.openSnackBar(`Downloading ${title} ${quality}`);
  }

  openSubtitle(url) {
    let link = `http://www.yifysubtitles.com/movie-imdb/${url}`;
    this.UI.openLink(link);
  }

  showImage(){
    this.fanartApi.getMovieImages(this.imdb_id, 'movies').subscribe(
      res => {
        this.background = res['moviebackground'];
        this.banner = res['moviebanner'];
        console.log(this.background);
        console.log(this.banner);

      })
  }

  watchTrailer(code) {
    let url = `https://www.youtube.com/embed/${code}`;
    this.UI.newWindow(url)
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
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
