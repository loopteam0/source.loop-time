import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class AppStateService {
    animeListState: BehaviorSubject<Array<any>> = new BehaviorSubject(null)
    MovieListState: BehaviorSubject<Array<any>> = new BehaviorSubject(null)
    BooksListState: BehaviorSubject<Array<any>> = new BehaviorSubject(null)
    GamesListState: BehaviorSubject<Array<any>> = new BehaviorSubject(null)
    MusicsListState: BehaviorSubject<Array<any>> = new BehaviorSubject(null)
    SoftwaresListState: BehaviorSubject<Array<any>> = new BehaviorSubject(null)
    SearchResultsState: BehaviorSubject<Array<any>> = new BehaviorSubject(null)

    constructor() {}
}
