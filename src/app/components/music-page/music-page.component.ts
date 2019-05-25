import { HttpClient } from '@angular/common/http'
import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator, MatSort } from '@angular/material'
import { merge, Observable, of as observableOf } from 'rxjs'
import { catchError, map, startWith, switchMap } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material'
import { MatTableDataSource } from '@angular/material'
import { TorrentSearchApiService } from '../../services/torrent-search-api.service'
import { AppStateService } from '../../services/app-state.service'

@Component({
    selector: `app-music-page`,
    templateUrl: `./music-page.component.html`,
    styleUrls: [`./music-page.component.scss`],
})
export class MusicPageComponent implements OnInit {
    loading: boolean
    Musics = this.State.MusicsListState
    searched: boolean
    errorState = false

    searchTerm = ''
    limit = 100
    category = 'PopularMusics'

    constructor(
        private Torrent: TorrentSearchApiService,
        private snackbar: MatSnackBar,
        private State: AppStateService
    ) {}
    // dataSource = new MatTableDataSource<torrent>(this.Results);

    @ViewChild(MatPaginator)
    paginator: MatPaginator

    ngOnInit() {
        switch (this.Musics.value) {
            case null:
                console.log(this.Musics.value)
                this.showMusics()
                break
            case undefined:
                console.log(this.Musics.value)
                this.showMusics()
                break
            default:
                console.log(this.Musics.value)
                break
        }
    }

    async showMusics(query?: string) {
        this.searched = false
        this.loading = true
        this.errorState = false

        if (await query) {
            this.searched = true

            this.searchTerm = query
            this.limit = 50
            this.category = 'Music'
        }

        this.Torrent.getTorrents(
            this.searchTerm,
            this.category,
            this.limit
        ).then(
            torrents => {
                this.State.MusicsListState.next(torrents)
                this.errorState = false

                this.loading = false
            },
            err => {
                this.errorState = true
                this.loading = false
                this.showError(err)
            }
        )
    }

    //  search(key){
    //    this.searched = true;
    //      this.loading = true;
    //      this.errorState = false;
    //   this.Torrent.getTorrents(key, 'Music', 50)
    //     .then(torrents => {
    //       this.Musics = torrents;
    //       this.loading = false;
    //       this.showError(`${this.Musics.length} Results Found On ${key}`);
    //     }, err => {
    //     this.showError(err);
    //     this.loading = false;
    //     });
    //  }

    download(torrent) {
        this.Torrent.downloadMagnet(torrent)
    }

    showError(err) {
        this.snackbar.open(err, null, {
            duration: 3000,
        })
    }
}

export interface torrent {
    title?: string
    size?: string
    seeds?: number
    peers?: number
    time?: string
    magnet?: string
    desc?: string
    provider?: string
}
