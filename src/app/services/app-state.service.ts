import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

interface state {
    pageNumber?: number
    data$?: Array<any>
    errorState?: boolean
    pagination?: boolean
    homeButton?: boolean
    loading?: boolean
}
@Injectable({
    providedIn: 'root',
})
export class AppStateService {
    // torrrets states
    animeListState: BehaviorSubject<Array<any>> = new BehaviorSubject(null)
    BooksListState: BehaviorSubject<Array<any>> = new BehaviorSubject(null)
    GamesListState: BehaviorSubject<Array<any>> = new BehaviorSubject(null)
    MusicsListState: BehaviorSubject<Array<any>> = new BehaviorSubject(null)
    SoftwaresListState: BehaviorSubject<Array<any>> = new BehaviorSubject(null)
    SearchResultsState: BehaviorSubject<Array<any>> = new BehaviorSubject(null)

    /// TV Shows states
    TvShowsState: BehaviorSubject<Array<any>> = new BehaviorSubject(null)
    MovieListState: BehaviorSubject<any> = new BehaviorSubject(null)

    constructor() {}
}
