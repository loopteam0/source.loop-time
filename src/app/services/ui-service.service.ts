import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(public dialog: MatDialog,public snackbar: MatSnackBar) { }

  openDialog(data:object , component, Class:string = null, H ='95vh', W = '90vw',close = true ) {

    const dialogRef = this.dialog.open(component, {
      data: data ,
      height: H,
      width: W ,
      panelClass: Class,
      disableClose: close,
      restoreFocus: false,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  openSnackBar(data, duration?, action = null){
    this.snackbar.open(data , action , {
      duration : duration,
      panelClass: 'snackbar'
    })
  }

}
