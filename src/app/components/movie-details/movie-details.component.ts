import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { SearchService } from '../../services/search.service';
import { ElectronService } from '../../services/electron.service';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
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
  constructor(
    private dialog: MatDialog,
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
      const id = params.get('id');
      this.Id = id;
      this.imdb_id = imdb_id;
    });

    this.getmoviedetails();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(downloadDialog, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
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


@Component({
  selector: 'download-dialog',
  templateUrl: 'download-dialog.html',
})
export class downloadDialog {

  constructor(
    public dialogRef: MatDialogRef<downloadDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
