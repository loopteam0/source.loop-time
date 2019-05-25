import { Component, OnInit, OnDestroy, Inject } from '@angular/core'
import { ActivatedRoute, UrlHandlingStrategy } from '@angular/router'
import { MatSnackBar } from '@angular/material'
import { SearchService } from '../../services/search.service'
import { ElectronService } from '../../services/electron.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { FanartTvService } from '../../services/fanart-tv.service'
import { UiServiceService } from '../../services/ui-service.service'
import { Subscription } from 'rxjs'
import { DomSanitizer } from '@angular/platform-browser'
import { TorrentSearchApiService } from '../../services/torrent-search-api.service'

export interface DialogData {
    torrents: Array<any>
    title_long: string
    name: string
}

export interface bgImages {
    id: number
    url: string
}

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
    movieDetails
    subscribe: Subscription
    Id
    loading: boolean
    errorState = false
    background
    banner
    coverImg: any
    trailer: any
    randomMovies: import('/home/loop-inc/Documents/coding/Loop-Client/src/app/services/interface').MoviesInt[]

    constructor(
        public UI: UiServiceService,
        public dialogRef: MatDialogRef<MovieDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fanartApi: FanartTvService,
        private request: SearchService,
        public snackBar: MatSnackBar,
        private sanitizer: DomSanitizer
    ) {}

    getmoviedetails() {
        // start the loadig spinner
        this.loading = true
        this.errorState = false
        // pass the movie id to the getMoviesDetails function
        this.subscribe = this.request.getMovieDetails(this.Id).subscribe(
            data => {
                this.movieDetails = data['movie']
                // this.showImage(this.movieDetails.imdb_code)
                this.setBackground(this.movieDetails.background_image)
                this.showRandomMovies(this.movieDetails.id)
                this.loading = false
                this.errorState = false
                // this.watchTrailer()
            },
            err => {
                this.openSnackBar(err)
                this.errorState = true
                this.loading = false
            }
        )
    }

    ngOnInit() {
        this.Id = this.data['id']

        this.getmoviedetails()
    }

    showRandomMovies(id) {
        this.request.getRandomMovies(id).subscribe(res => {
            this.randomMovies = res['movies']
        })
    }

    openDialog(id, imdb_id): void {
        if (id) {
            const info: object = {
                id: id,
                imdb_id: imdb_id,
            }
            this.UI.openDialog(
                info,
                MovieDetailsComponent,
                'Download-dialog',
                '100%',
                '100vw'
            )
        } else {
            const info: object = {
                title: this.movieDetails.title_long,
                files: this.movieDetails.torrents,
                torrents: this.movieDetails,
            }
            this.UI.openDialog(
                info,
                MovieDownloadDialogComponent,
                'movie-download-dialog',
                'auto',
                'auto',
                false
            )
        }
    }

    closeMe() {
        this.dialogRef.close()
    }

    onNoClick(): void {
        this.dialogRef.close()
    }

    openSnackBar(title: string, quality?: string) {
        this.UI.openSnackBar(`Downloading ${title} ${quality}`)
    }

    openSubtitle(url: any) {
        this.UI.openLink(`http://www.yifysubtitles.com/movie-imdb/${url}`)
    }

    openLink() {
        this.UI.openMartLink()
    }

    setBackground(url: string) {
        this.coverImg = this.sanitizer.bypassSecurityTrustUrl(url)
    }

    // showImage(id) {
    //     this.fanartApi.getMovieImages(id, 'movies').subscribe(res => {
    //         this.background = res['moviebackground']
    //         this.banner = res['moviebanner']
    //         console.log(res, this.background)
    //     })
    // }

    watchTrailer() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${this.movieDetails.yt_trailer_code}`
        )
    }

    ngOnDestroy() {
        this.subscribe.unsubscribe()
    }
}

// /
// /
// /
// /
//
//
//
//
//
//
//
//
//
//
//
//
//
//

@Component({
    selector: 'download-dialog',
    templateUrl: './download-template/movie-download-dialog.html',
    styleUrls: ['./movie-download-dialog.scss'],
})
export class MovieDownloadDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<MovieDownloadDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public snackBar: MatSnackBar,
        private torrent: TorrentSearchApiService
    ) {}

    onNoClick(): void {
        this.dialogRef.close()
    }

    openSnackBar(title: string, quality: string) {
        this.snackBar.open(`Downloading ${title} ${quality}`, 'close')
    }

    download(url) {
        // this.electron.shell.openItem(url)
        this.torrent.torrentParser(url)
    }
}
