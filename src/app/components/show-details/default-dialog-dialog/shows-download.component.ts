import { Inject} from '@angular/core';
import { Component ,  OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ElectronService } from '../../../services/electron.service';

@Component({
  selector: 'show-dload-dialog',
  templateUrl: './show-download-dialog.html',
  styleUrls: ['./../show-download-dialog.scss']
})
export class ShowDefaultDialogComponent  implements OnInit, OnDestroy{

  constructor(
    public dialogRef: MatDialogRef<ShowDefaultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackBar: MatSnackBar,
    private electron: ElectronService
    ) {}

    ngOnInit(): void {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(title: string) {
    this.snackBar.open(`Downloading ${title} ` , 'close');
  }
  download(url,snkMsg){
    this.electron.shell.openExternal(url);
    this.openSnackBar(snkMsg);
  }
  showError(err){
    this.snackBar.open(err);
  }

  ngOnDestroy(){
   // this.request.getShowEpisopse(0 ,0,0).unsubscribe();
 //  this.episodes.unsubscribe();
  }

}
