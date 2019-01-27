import { Component ,  OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ShowDownloadDialogComponent } from './default-dialog-dialog/shows-download.component';
import { SearchService } from '../../services/search.service';
import { Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Subscription } from 'rxjs';

export interface DialogData {
  episodes : object,
  lenght: any,
  loading: any,
  error: any
}

//declare the id to be used acrose all components
//let val;

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit, OnDestroy {
  errorState = false;
  showDetails;
  subscribe: Subscription;
  Id;
  showDataloading;

  constructor(
    public UI: UiServiceService,
    public dialogRef: MatDialogRef<ShowDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private request: SearchService,
    public snackBar: MatSnackBar
    ){}


  requestShowDetails() {
    // start spinner
    this.showDataloading = true;
     /// get the details of the show from popCorn api
     this.subscribe = this.request.getShowDetails(this.Id)
       .subscribe( data => {
        this.showDetails = data;
        this.showDataloading = false;
       this.errorState = false;
     }, err => {
       this.openSnackBar(err);
       this.errorState = true;
       this.showDataloading = false;
     });

  }


  ngOnInit() {
      this.Id = this.data['id'].substr(2);
      this.requestShowDetails();
  }

  openShowsDialog(data: any, title: any,seasons: any): void {

   const info:Object = {
      torrents: data,
      title: title,
      imdbCode: this.Id,
      seasons: seasons
    }
    this.UI.openDialog(info ,ShowDownloadDialogComponent ,'shows-download-dialog' )
  }

  closeDialog(){
    this.dialogRef.close()
  }

  RETRY(){
    this.errorState= false;
    this.requestShowDetails();
  }

  openSnackBar(msg: string) {
    this.UI.openSnackBar(` ${msg} `);
  }

  ngOnDestroy() {
   this.subscribe.unsubscribe();
  }
}

