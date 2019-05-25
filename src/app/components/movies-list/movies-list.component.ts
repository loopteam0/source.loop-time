import {
    Component,
    OnInit,
    ViewChild,
    AfterViewInit,
    OnDestroy,
    ElementRef,
} from '@angular/core'
import { Router } from '@angular/router'
import { SearchService } from '../../services/search.service'
import { FanartTvService } from '../../services/fanart-tv.service'
import { MovieDetailsComponent } from '../movie-details/movie-details.component'
import { UiServiceService } from '../../services/ui-service.service'
import { Subscription, fromEvent } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import { NgModel } from '@angular/forms'
import { AppStateService } from '../../services/app-state.service'

@Component({
    selector: 'app-movies-list',
    templateUrl: './movies-list.component.html',
    styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit, OnDestroy, AfterViewInit {
    public Movies: any
    public Pages: any
    errorState = false
    moviesLoading: boolean
    selectedValue: string
    background: any
    banner: any
    home = false
    searchLt: any

    subscribe: Subscription
    @ViewChild('input') searchInput: ElementRef

    // pagination
    length: number
    pageSize = 50
    pageIndex: any
    pageSizeOptions = [50, 30, 10]
    retryIndex: number
    pagination: boolean = true

    constructor(
        public UI: UiServiceService,
        private request: SearchService,
        private State: AppStateService
    ) {}

    ngOnInit() {
        this.requestMoviesList(1)
        // this.State.MovieListState.subscribe(res => {
        //     switch (res) {
        //         case null:
        //             this.requestMoviesList(1)
        //             break

        //         default:
        //             this.Movies = res
        //             break
        //     }
        // })
    }

    ngAfterViewInit() {
        fromEvent(this.searchInput.nativeElement, 'keyup')
            .pipe(
                debounceTime(2000),
                distinctUntilChanged(),
                map((event: Event) => (<HTMLInputElement>event.target).value)
            )
            .subscribe((val: string) => {
                if (val.trim().length === 0 || !val) {
                    // do nothing
                } else if (val.length === 0) {
                    this.requestMoviesList(1)
                } else {
                    this.search(val)
                }
            })
    }

    /** Get Movies List from Yts */
    requestMoviesList(i: number) {
        this.home = false
        this.moviesLoading = true
        this.errorState = false
        this.pagination = false
        this.subscribe = this.request.getMoviesList(i, 50).subscribe(
            data => {
                this.Movies = data['movies']
                this.length = data['movie_count']
                this.moviesLoading = false
                this.errorState = false
                this.pagination = true
            },
            err => {
                this.openSnackbar(err)
                this.errorState = true
                this.moviesLoading = false
                this.pagination = false
            }
        )
    }

    search(keyword: string) {
        this.moviesLoading = true
        this.errorState = false
        this.home = true
        this.pagination = false
        this.subscribe = this.request.getMoviesByKeyword(keyword).subscribe(
            data => {
                this.moviesLoading = false
                this.Movies = data['movies']
                this.length = data['movie_count']

                if (this.length == 0) {
                    this.openSnackbar(`Nothing Found`)
                } else {
                    this.openSnackbar(`${this.length} Result(s) Found`)
                }
            },
            err => {
                this.openSnackbar(err)
                this.moviesLoading = false
            }
        )
    }

    paginate(e: any) {
        this.retryIndex = e.pageIndex + 1
        this.moviesLoading = true
        this.pagination = true
        this.errorState = false
        this.openSnackbar(`Page ${e.pageIndex + 1} Is Loading`)

        this.subscribe = this.request
            .getMoviesList(e.pageIndex + 1, e.pageSize)
            .subscribe(
                data => {
                    this.Movies = data['movies']
                    this.length = data['movie_count']
                    this.moviesLoading = false
                    this.errorState = false
                },
                err => {
                    this.openSnackbar(err)
                    this.errorState = true
                    this.moviesLoading = false
                }
            )
    }

    openDialog(id: any, imdb_id): void {
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
    }

    RETRY() {
        if (this.retryIndex === undefined) {
            this.retryIndex = 1
        }
        this.home = false
        this.errorState = false
        this.requestMoviesList(this.retryIndex ? 1 : this.retryIndex)
    }

    openSnackbar(msg: string) {
        this.UI.openSnackBar(msg)
    }

    ngOnDestroy(): void {
        this.subscribe.unsubscribe()
        // this.State.MovieListState.next(this.Movies)
    }
}
