import { Component, OnInit } from '@angular/core'
import { TorrentSearchApiService } from '../../services/torrent-search-api.service'
import { UiServiceService } from '../../services/ui-service.service'
import { AppStateService } from '../../services/app-state.service'
import { BehaviorSubject } from 'rxjs'

@Component({
    selector: 'app-animes-list',
    templateUrl: './animes-list.component.html',
    styleUrls: ['./animes-list.component.scss'],
})
export class AnimesListComponent implements OnInit {
    animes: BehaviorSubject<Array<any>> = this.State.animeListState
    loading: boolean
    searched: boolean = false
    errorState: boolean = false

    searchTerm = ''
    limit = 100
    category = 'PopularAnime'

    constructor(
        private Torrent: TorrentSearchApiService,
        private UI: UiServiceService,
        private State: AppStateService
    ) {}

    ngOnInit() {
        console.log(this.animes)

        switch (this.animes.value) {
            case null:
                console.log(this.animes.value)
                this.showTorrents()
                break
            case undefined:
                console.log(this.animes.value)
                this.showTorrents()
                break
            default:
                break
        }
    }

    async showTorrents(query?: string) {
        this.searched = false
        this.loading = true
        this.errorState = false

        if (await query) {
            this.searched = true

            this.searchTerm = query
            this.limit = 50
            this.category = 'Anime'
        }

        await this.Torrent.getTorrents(
            this.searchTerm,
            this.category,
            this.limit
        ).then(
            torrents => {
                this.State.animeListState.next(torrents)
                console.log(torrents)

                this.errorState = false
                this.loading = false
            },
            err => {
                this.UI.openSnackBar(err)
                this.loading = false
                this.errorState = true
            }
        )
    }

    download(torrent) {
        this.Torrent.downloadMagnet(torrent)
    }
}
