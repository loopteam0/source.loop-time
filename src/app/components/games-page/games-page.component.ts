import { Component, OnInit } from '@angular/core'
import { TorrentSearchApiService } from '../../services/torrent-search-api.service'
import { MatSnackBar } from '@angular/material'
import { AppStateService } from 'src/app/services/app-state.service'
import { UiServiceService } from 'src/app/services/ui-service.service'

@Component({
    selector: 'app-games-page',
    templateUrl: './games-page.component.html',
    styleUrls: ['./games-page.component.scss'],
})
export class GamesPageComponent implements OnInit {
    Games = this.State.GamesListState
    PirateGames
    loading
    searched
    errorState = false

    searchTerm = ''
    limit = 100
    category = 'PopularGames'

    constructor(
        private Torrent: TorrentSearchApiService,
        private snackbar: MatSnackBar,
        private State: AppStateService,
        private UI: UiServiceService
    ) {}

    ngOnInit() {
        if (this.Games.value === null) {
            this.show1337xTorrents()
        }
    }

    async show1337xTorrents(query?: string) {
        this.searched = false
        this.loading = true
        this.errorState = false

        if (await query) {
            this.searched = false

            this.searchTerm = query
            this.limit = 50
            this.category = 'Games'
        }

        await this.Torrent.getTorrents(
            this.searchTerm,
            this.category,
            this.limit
        )
            .then(res => {
                this.State.GamesListState.next(res)
                this.loading = false
                this.errorState = false
                this.UI.openSnackBar(
                    `showing ${this.Games.value.length || 0} results`
                )
            })
            .catch(err => {
                this.loading = false
                this.errorState = true
            })
    }

    // search(key) {
    //   this.searched = true;
    //   this.loading = true;
    //   this.Torrent.getTorrents(key,'Games', 50).then(res => {
    //     this.Games = res;
    //     this.loading = false;
    //     this.showError(`${this.Games.length} Results Found On ${key}`);
    // },
    //   err => {
    //   this.showError(err);
    //     this.loading = false;
    //   });
    // }

    // searchPirate(title) {
    //   this.searched = true;
    //   this.loading = true;
    //   this.Torrent.pirateBaySearch(title, 400).then(res => {
    //     this.Games = res;
    //     this.loading = false;
    //     if (this.Games.length == 0) {
    //       this.showError(`${this.Games.length} Not Found`);
    //     }else {
    //       this.showError(`${this.Games.length} Results Found`);
    //     }
    // },
    //   err => {
    //   this.showError(err);
    //     this.loading = false;
    //   });
    // }

    download(torrent) {
        this.Torrent.downloadMagnet(torrent)
    }

    showError(err) {
        this.snackbar.open(err)
    }
}
