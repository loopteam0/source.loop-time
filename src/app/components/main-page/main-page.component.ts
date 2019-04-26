import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ElementRef,
} from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { MovieDbService } from '../../services/movie-db.service'
import { OtherMoviesComponent } from '../other-movies/other-movies.component'
import { UiServiceService } from 'src/app/services/ui-service.service'
import { Subscription, fromEvent } from 'rxjs'
import { distinctUntilChanged, map, debounceTime } from 'rxjs/operators'

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
    public upcomingMovies: any[]
    loading: boolean
    errorMsg = 'An unknown error occured while requesting'
    i: any
    home: boolean
    subscription: Subscription
    /** PAGINATION */
    lenght: any
    pageSize = 20
    pageIndex: any
    pageSizeOptions = [20]
    imageurl: string
    errorState: boolean
    @ViewChild('input') searchInput: ElementRef

    constructor(
        public UI: UiServiceService,
        private movieDB: MovieDbService,
        private snackBar: MatSnackBar
    ) {
        this.imageurl = 'https://image.tmdb.org/t/p/w500'
    }

    ngOnInit() {
        this.showMoviesNowPlayingList(1)
    }

    ngAfterViewInit() {
        fromEvent(this.searchInput.nativeElement, 'keyup')
            .pipe(
                debounceTime(2000),
                map((event: Event) => (<HTMLInputElement>event.target).value),
                distinctUntilChanged()
            )
            .subscribe((val: string) => {
                if (val.trim().length === 0 || !val) {
                    // do nothing
                } else {
                    this.search(val)
                }
            })
    }

    /** Get upcoming Movies List from Yts */
    showMoviesNowPlayingList(i: number) {
        this.home = false
        this.loading = true
        this.errorState = false
        this.subscription = this.movieDB.getNowPlaying(i).subscribe(
            res => {
                this.upcomingMovies = res['results']
                this.lenght = res['total_results']
                this.loading = false
                this.errorState = false
            },
            err => {
                this.showError(err)
                this.loading = false
                this.errorState = true
            }
        )
    }

    retry() {
        this.home = false
        this.showMoviesNowPlayingList(this.i ? 1 : this.i)
    }

    openDialog(data: any): void {
        const info: object = {
            id: data,
        }
        this.UI.openDialog(
            info,
            OtherMoviesComponent,
            'Download-dialog',
            '105vh',
            '100vw'
        )
    }

    showError(err: string) {
        const errorSnackRef = this.snackBar.open(err, 'retry', {
            duration: 5000,
        })
        errorSnackRef.onAction().subscribe(res => {
            this.showMoviesNowPlayingList(1)
        })
    }

    search(keyword: string) {
        this.loading = true
        this.errorState = false
        this.home = true
        this.subscription = this.movieDB
            .searchKeyword(keyword, 'movie', 1)
            .subscribe(
                res => {
                    this.upcomingMovies = res
                    this.loading = false
                    this.errorState = false
                    if (this.upcomingMovies.length == 0) {
                        this.showError(`${keyword} Not Found`)
                    } else {
                        this.showError(
                            `${this.upcomingMovies.length} Items Found`
                        )
                    }
                },
                err => {
                    this.loading = false
                    this.errorState = false
                    this.showError(err)
                }
            )
    }

    Page(e: { pageIndex: number }, cat: any) {
        this.loading = true
        this.errorState = false
        this.i = e.pageIndex + 1
        this.subscription = this.movieDB
            .getNowPlaying(e.pageIndex + 1)
            .subscribe(
                res => {
                    this.errorState = false
                    this.loading = false
                    this.upcomingMovies = res['results']
                },
                err => {
                    this.loading = false
                    this.errorState = true
                    this.showError(err)
                }
            )
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}
