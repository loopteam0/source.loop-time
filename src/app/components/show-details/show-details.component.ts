import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { MatSnackBar } from '@angular/material'
import { ShowDownloadDialogComponent } from './default-dialog-dialog/shows-download.component'
import { SearchService } from '../../services/search.service'
import { Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { UiServiceService } from '../../services/ui-service.service'
import { Subscription } from 'rxjs'
import { FanartTvService } from '../../services/fanart-tv.service'

export interface DialogData {
    episodes: object
    lenght: any
    loading: any
    error: any
}

//declare the id to be used acrose all components
//let val;

@Component({
    selector: 'app-show-details',
    templateUrl: './show-details.component.html',
    styleUrls: ['./show-details.component.scss'],
})
export class ShowDetailsComponent implements OnInit, OnDestroy {
    errorState = false
    showDetails
    subscribe: Subscription
    Id
    showDataloading
    cover: ElementRef
    background: any
    banner: any
    randomMovie: any

    constructor(
        public UI: UiServiceService,
        public dialogRef: MatDialogRef<ShowDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private request: SearchService,
        public snackBar: MatSnackBar,
        private sanitizer: DomSanitizer,
        private fanartApi: FanartTvService
    ) {}

    requestShowDetails() {
        // start spinner
        this.showDataloading = true
        this.errorState = false
        /// get the details of the show from popCorn api
        this.subscribe = this.request.getShowDetails(this.Id).subscribe(
            data => {
                this.showDetails = data
                this.showDataloading = false
                this.errorState = false
                this.showRandom()
                //  this.showImage(data['tvdb_id'])
            },
            err => {
                this.openSnackBar(err)
                this.errorState = true
                this.showDataloading = false
            }
        )
    }

    openDialog(data): void {
        const info: object = {
            id: data,
        }
        this.UI.openDialog(
            info,
            ShowDetailsComponent,
            'Download-dialog',
            '100vh',
            '100vw'
        )
    }

    // showImage(id) {
    //     this.fanartApi.getMovieImages(id, 'tv').subscribe(res => {
    //         this.background = res['moviebackground']
    //         this.banner = res['moviebanner']
    //         console.log(res, this.background)
    //     })
    // }

    showRandom() {
        this.subscribe = this.request.getRandomShows().subscribe(res => {
            this.randomMovie = res
        })
    }

    ngOnInit() {
        this.Id = this.data['id'].substr(2)
        this.requestShowDetails()
    }

    openShowsDialog(data: any, title: any, seasons: any): void {
        const info: Object = {
            torrents: data,
            title: title,
            imdbCode: this.Id,
            seasons: seasons,
        }
        this.UI.openDialog(
            info,
            ShowDownloadDialogComponent,
            'shows-download-dialog',
            '100vh',
            '100vw'
        )
    }

    openLink() {
        this.UI.openMartLink()
    }

    setBackground(url: string) {
        return this.sanitizer.bypassSecurityTrustUrl(url)
    }

    openSnackBar(msg: string) {
        this.UI.openSnackBar(` ${msg} `)
    }

    ngOnDestroy() {
        this.subscribe.unsubscribe()
    }
}
