import { Injectable } from '@angular/core'
import { MatSnackBar, MatDialog } from '@angular/material'
import { ElectronService } from './electron.service'

@Injectable({
    providedIn: 'root',
})
export class UiServiceService {
    instantSearch: boolean = true
    CustomTitlebar = this.electron.customTitlebar

    constructor(
        public dialog: MatDialog,
        public snackbar: MatSnackBar,
        private electron: ElectronService
    ) {}

    openDialog(
        data: object,
        component: any,
        Class: string = null,
        H = '95vh',
        W = '90vw',
        close?: boolean
    ) {
        const dialogRef = this.dialog.open(component, {
            data: data,
            height: H,
            width: W,
            panelClass: Class,
            disableClose: close,
            restoreFocus: false,
            autoFocus: false,
        })

        dialogRef.afterClosed().subscribe(result => {
            // console.log(result)
        })
    }

    openSnackBar(data: string, duration: number = 5000, action = null) {
        this.snackbar.open(data, action, {
            duration: duration,
            panelClass: 'snackbar',
        })
    }

    notify(title?: string, body?: string) {
        let notification = new Notification(title, {
            body: body,
        })

        notification.onclick = () => {
            console.log('clicked')
        }
    }

    newWindow(url: string) {
        window.open(url)
    }

    openLink(url: string) {
        if (this.electron.isElectron()) {
            this.electron.shell.openExternal(url)
        } else {
            window.open(url)
        }
    }

    openMartLink() {
        this.electron.shell.openExternal(
            'https://www.amazon.com/Amazon-Video/b/ref=sv_atv_logo?node=2858778011&ie=UTF8'
        )
    }
    // setting a custom titleBar
    setTitlebar(color: string = '#fff') {
        new this.CustomTitlebar.Titlebar({
            backgroundColor: this.CustomTitlebar.Color.fromHex(color),
            icon: '../../assets/icons/icon.png',
            shadow: true,
        })
    }
}
