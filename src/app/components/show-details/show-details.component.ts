import { Component ,  OnInit, OnDestroy } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {  HttpErrorResponse, HttpClient } from '@angular/common/http';
import { ShowDownloadDialogComponent } from './default-dialog-dialog/shows-download.component';
import { SearchService } from '../../services/search.service';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  episodes : object,
  lenght: any,
  loading: any,
  error: any
}

//declare the id to be used acrose all components
let val;

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit, OnDestroy {
  errorState = false;
  showDetails;
  Id;
  imdb_id;
  showDataloading;

  constructor(
    private dialog: MatDialog,
    private request: SearchService,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute){}


  requestShowDetails() {
    // start spinner
    this.showDataloading = true;
     /// get the details of the show from popCorn api
     this.request.getShowDetails(this.Id)
       .subscribe( data => {
        this.showDetails = data;
        this.showDataloading = false;
       this.errorState = false;
     }, err => {
       this.showError(err);
       this.errorState = true;
       this.showDataloading = false;
     });

  }


  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
        const imdb_id = params.get('imdb_id');
       // get imdb_id without tt
        this.Id = imdb_id.substr(2);
        val = this.Id;
      });

      this.requestShowDetails();
  }

  openShowsDialog(data, title,seasons): void {
    const dialogRef = this.dialog.open(ShowDownloadDialogComponent , {
      data: {
        torrents: data,
        title: title,
        imdbCode: this.Id,
        seasons: seasons
      },
       minHeight: '80vh',
       maxWidth: '65vw',
       minWidth: '65vw',
       autoFocus: false,
       panelClass: 'shows-download-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }


  RETRY(){
    this.errorState= false;
    this.requestShowDetails();
  }

  openSnackBar(title: string) {
    this.snackBar.open(`Downloading ${title} ` , 'close');
  }

  showError(err){
    this.snackBar.open(err);
  }


  ngOnDestroy() {
   // this.imdb_id.unsubscribe();
  }
}

