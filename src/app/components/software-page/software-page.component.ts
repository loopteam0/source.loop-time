import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator, MatSort } from '@angular/material'
import { merge, Observable, of as observableOf } from 'rxjs'
import { DataSource } from '@angular/cdk/collections'
import { MatTableDataSource } from '@angular/material'
import { TorrentSearchApiService } from '../../services/torrent-search-api.service'
import { MatSnackBar } from '@angular/material'
import { AppStateService } from '../../services/app-state.service'
import { UiServiceService } from '../../services/ui-service.service'

@Component({
    selector: 'app-software-page',
    templateUrl: './software-page.component.html',
    styleUrls: ['./software-page.component.scss'],
})
export class SoftwarePageComponent implements OnInit {
    // dataSource = new TorrentSource(Torrent);
    Softwares = this.State.SoftwaresListState
    loading: boolean
    searching: any
    results: any
    errorState = false
    searched: boolean
    provider = '1337x'

    searchTerm = ''
    limit = 100
    category = 'PopularApps'

    constructor(
        private Torrent: TorrentSearchApiService,
        private snackbar: MatSnackBar,
        private State: AppStateService,
        private UI: UiServiceService
    ) {}

    @ViewChild(MatPaginator)
    paginator: MatPaginator

    ngOnInit() {
        //  this.dataSource.paginator = this.paginator;
        switch (this.Softwares.value) {
            case null:
                console.log(this.Softwares.value)
                this.showSoftwares()
                break
            case undefined:
                console.log(this.Softwares.value)
                this.showSoftwares()
                break
            default:
                console.log(this.Softwares.value)

                break
        }
    }

    async showSoftwares(query?: string) {
        this.searched = false
        this.loading = true

        if (await query) {
            this.searched = true

            this.searchTerm = query
            this.limit = 50
            this.category = 'Applications'
        }

        this.Torrent.getTorrents(
            this.searchTerm,
            this.category,
            this.limit
        ).then(
            res => {
                this.State.SoftwaresListState.next(res)
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

    // search(key) {
    //   this.searched = true;
    //   this.loading = true;
    //   this.errorState = false;
    //   this.Torrent.getTorrents(key ,'Applications', 50).then(
    //     res => {
    //       this.Softwares = res;
    //       this.loading = false;
    //       this.showError(`${this.Softwares.length} Results Found On ${key}`);

    //   },
    //     err => {
    //       this.showError(err);
    //       this.loading = false;
    //   });

    // }

    download(item) {
        this.Torrent.downloadMagnet(item)
    }

    showError(err) {
        this.snackbar.open(err)
    }
}

// tslint:disable-next-line:class-name
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
