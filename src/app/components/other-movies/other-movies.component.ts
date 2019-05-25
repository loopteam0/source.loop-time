import { Component, OnInit, Inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { MovieDbService } from '../../services/movie-db.service'
import { TorrentSearchApiService } from '../../services/torrent-search-api.service'
import { ElectronService } from '../../services/electron.service'
import { MatSnackBar } from '@angular/material'
import { DatePipe } from '@angular/common'
import { UiServiceService } from '../../services/ui-service.service'
import { DomSanitizer } from '@angular/platform-browser'

let MovieTitle: any
let movieYear: string

@Component({
    selector: 'app-other-movies',
    templateUrl: './other-movies.component.html',
    styleUrls: ['./other-movies.component.scss'],
})
export class OtherMoviesComponent implements OnInit {
    loading: boolean
    Id: any
    movieDetails: any
    imageurl: string
    errorState: boolean
    banner

    constructor(
        public UI: UiServiceService,
        public dialogRef: MatDialogRef<OtherMoviesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialog,
        private torrent: TorrentSearchApiService,
        private route: ActivatedRoute,
        private movieDB: MovieDbService,
        private electron: ElectronService,
        private snackbar: MatSnackBar,
        private datepipe: DatePipe,
        private sanitizer: DomSanitizer
    ) {
        this.imageurl = 'https://image.tmdb.org/t/p/w500'
        //w780
    }

    ngOnInit() {
        this.Id = this.data['id']
        this.showDetails()
    }

    showDetails() {
        this.loading = true
        this.errorState = false
        this.movieDB.getDetails(this.Id, 'movie').subscribe(
            res => {
                this.movieDetails = res
                this.loading = false
                MovieTitle = this.movieDetails.title
                movieYear = this.datepipe.transform(
                    this.movieDetails.release_date,
                    'yyyy'
                )
                this.errorState = false
                this.setBackground(this.movieDetails.backdrop_path)
            },
            err => {
                this.errorState = true
                ;(this.loading = false), this.UI.openSnackBar(err)
            }
        )
    }

    openLink(url: any) {
        if (this.electron.isElectron()) {
            this.electron.shell.openExternal(url)
        } else {
            window.open(url)
        }
    }

    openDialog(title: any, date: any): void {
        const info: object = {
            title: title,
            date: date,
        }

        this.UI.openDialog(
            info,
            OtherMovieDownloadDialogComponent,
            'other-download-dialog'
        )
    }

    closeDialog() {
        this.dialogRef.close()
    }

    download(torrent: any) {
        this.torrent.downloadMagnet(torrent)
    }

    setBackground(url: any) {
        this.banner = this.sanitizer.bypassSecurityTrustUrl(
            `https://image.tmdb.org/t/p/w780/${url}`
        )
    }
    showError(err: string) {
        this.snackbar.open(err)
    }
}

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
    templateUrl: './download-template/OtherMovieDownloadDialog.html',
    styleUrls: ['./OtherMovieDownloadDialog.scss'],
})
export class OtherMovieDownloadDialogComponent implements OnInit {
    loading: boolean
    movies: any
    errorState: boolean
    keyword = `${MovieTitle} ${movieYear}`

    constructor(
        public dialogRef: MatDialogRef<OtherMovieDownloadDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        public snackBar: MatSnackBar,
        private electron: ElectronService,
        private torrent: TorrentSearchApiService
    ) {}

    onNoClick(): void {
        this.dialogRef.close()
    }

    ngOnInit() {
        this.showMovies()
    }

    openSnackBar(title: string) {
        this.snackBar.open(`Downloading ${title}`, 'close')
    }

    showMovies() {
        let val = this.keyword
        let newKeyword = val.replace(/:|-/g, ' ')
        console.log(newKeyword)

        this.loading = true
        this.errorState = false

        this.torrent.getTorrents(newKeyword, 'Movies', 20).then(
            data => {
                this.movies = data
                this.loading = false
            },
            err => {
                this.loading = false
                this.errorState = true
                this.showError(err)
            }
        )
    }

    showError(err: any): any {
        this.snackBar.open(err, null, {
            duration: 5000,
        })
    }

    downloadTorrent(torrent: any) {
        this.torrent.downloadTorrent(torrent).then(() => {
            console.log('done')
        })
    }

    download(torrent) {
        this.openSnackBar(torrent.title)
        this.torrent.downloadMagnet(torrent)
    }

    // retry(){
    //   this.el.
    // }
}
