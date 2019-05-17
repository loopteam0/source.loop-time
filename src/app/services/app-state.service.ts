import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class AppStateService {
    animeListState: BehaviorSubject<Array<any>> = new BehaviorSubject(null)

    constructor() {}
}
