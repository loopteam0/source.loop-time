import { Component ,  OnInit, OnDestroy } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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




  openDialog(data): void {
    const dialogRef = this.dialog.open(ShowDownloadDialogComponent, {
     // width: '250px',
      // data: {
      //   lenght: this.length
      // }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  RETRY(){
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
///
///
///
////
////
///
////
///
////
//

@Component({
  selector: 'show-download-dialog',
  templateUrl: './shows-download-dialog.html',
  styleUrls: ['./shows-download-dialog.scss']
})
export class ShowDownloadDialogComponent  implements OnInit, OnDestroy{
  errorState = false;
  loading;
  episodes ;
  Id;
  length;

  constructor(
    public dialogRef: MatDialogRef<ShowDownloadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private request: SearchService,
    ) {}

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.requestShowEpisodes(50, 1);
      this.Id = this.data['Id'];
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(title: string) {
    this.snackBar.open(`Downloading ${title} ` , 'close');
  }

  showError(err){
    this.snackBar.open(err);
  }


  requestShowEpisodes(size, page) {
    // start spinner
    this.loading = true;
    this.errorState = false;

    this.request.getShowEpisopse(val, size, page)
    .subscribe( (data) => {
      this.episodes = data['torrents'];
      this.length = data['torrents_count'];
   //   val = this.length;
      this.loading = false;
    }, err =>{
       this.showError(err);
       this.errorState = true;
      this.loading = false;
      });
  }

  retry(){
    this.requestShowEpisodes(50, 1);
  }

  page(e) {
    console.log(e);
    this.errorState = false;
    this.loading = true;

    this.request.getShowEpisopse(this.Id , e.pageSize, (e.pageIndex + 1))
      .subscribe((data) => {
        this.episodes = data['torrents'];
        this.loading = false;
      }, err => {
        this.showError(err);
        this.errorState = true;
        this.loading = false;
      });
  }

  ngOnDestroy(){
   // this.request.getShowEpisopse(0 ,0,0).unsubscribe();
 //  this.episodes.unsubscribe();
  }

}
