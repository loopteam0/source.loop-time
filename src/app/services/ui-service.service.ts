import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private dialog: MatDialog, snackbar: MatSnackBar) { }

  openDialog(data:object , component, Class:string = null, H ='95vh', W = '90vw' ) {

    const dialogRef = this.dialog.open(component, {
      data: data ,
      height: H,
      width: W ,
      panelClass: Class,
     // panelClass: '',
      restoreFocus: false,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }


}
