import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  instantSearch:boolean = true;

  constructor(public dialog: MatDialog,public snackbar: MatSnackBar) { }

  openDialog(data:object , component:any, Class:string = null, H ='95vh', W = '90vw', close:boolean = true ) {

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

  openSnackBar(data:string , duration: number = 5000, action = null) {
    this.snackbar.open(data , action , {
      duration : duration,
      panelClass: 'snackbar'
    })
  }

  notify( title?:string, body?:string) {
  //  let notification = new Notification( title ,{
  //    body: body
  //   })

  //   notification.onclick = () => {
  //     console.log('clicked');
  //   }
  }

  newWindow(url:string){
 //   window.open(url);
  }

  openLink(url:string){
    // if (this.electron.isElectron()) {
    //   this.electron.shell.openExternal(url);
    // } else {
    //   window.open(url);
    // }
  }



}
