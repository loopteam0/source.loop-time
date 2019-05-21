import { Component, OnInit } from '@angular/core'
import { TorrentSearchApiService } from '../../services/torrent-search-api.service'
import { MatSnackBar } from '@angular/material'
import { AppStateService } from 'src/app/services/app-state.service'
import { UiServiceService } from 'src/app/services/ui-service.service'

@Component({
    selector: 'app-book-page',
    templateUrl: './book-page.component.html',
    styleUrls: ['./book-page.component.scss'],
})
export class BookPageComponent implements OnInit {
    Others = this.State.BooksListState
    loading: boolean
    searched: boolean

    searchTerm = ''
    limit = 100
    category = 'PopularOther'

    // provider = '1337x';
    errorState = false
    constructor(
        private Torrent: TorrentSearchApiService,
        private snackbar: MatSnackBar,
        private State: AppStateService,
        private UI: UiServiceService
    ) {}

    ngOnInit() {
        if (this.Others.value === null) {
            this.showTorrents()
        }
    }

    async showTorrents(query?: string) {
        this.searched = false
        this.loading = true

        if (await query) {
            this.searched = false

            this.searchTerm = query
            this.limit = 50
            this.category = 'Other'
        }

        this.Torrent.getTorrents(
            this.searchTerm,
            this.category,
            this.limit
        ).then(
            res => {
                this.State.BooksListState.next(res)
                this.loading = false
                this.errorState = false
                this.UI.openSnackBar(
                    `showing ${this.Others.value.length || 0} results`
                )
            },
            err => {
                this.errorState = true
                this.loading = false
            }
        )
    }

    // search(key) {
    //   this.searched = true;
    //   this.loading = true;
    //   this.errorState = false;
    //   this.Torrent.getTorrents(key, 'Other' , 50).then(res => {
    //     this.Others = res;
    //     this.loading = false;
    //     this.showError(`${this.Others.length} Results Found On ${key}`);
    //   }, err => {
    //   this.showError(err);
    //   this.loading = false;
    //   });
    // }

    download(torrent: any) {
        this.Torrent.downloadMagnet(torrent)
    }

    showError(err: string) {
        this.snackbar.open(err)
    }
}
