import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  instantSearch:boolean = true;

  constructor(public dialog: MatDialog,public snackbar: MatSnackBar, private electron: ElectronService) { }

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

  openSnackBar(data, duration = 5000, action = null) {
    this.snackbar.open(data , action , {
      duration : duration,
      panelClass: 'snackbar'
    })
  }

  notify( title?:string, body?:string) {
   let notification = new Notification( title ,{
     body: body
    })

    notification.onclick = () => {
      console.log('clicked');
    }
  }

  newWindow(url:string, title:string=undefined, height:number=320, width:number=700){
    window.open(url, title, `width=${width},height=${height}` );
  }

  openLink(url){
    if (this.electron.isElectron()) {
      this.electron.shell.openExternal(url);
    } else {
      window.open(url);
    }
  }



}
