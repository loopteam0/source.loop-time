import { Injectable } from '@angular/core'
import { ElectronService } from './electron.service'
import { throwError } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class TorrentSearchApiService {
    constructor(private electron: ElectronService) {}

    async getTorrents(title: string, cat: string, limit: number) {
        try {
            this.electron.TorrentSearch.enableProvider('1337x')
            // this.electron.TorrentSearch.enableProvider('ThePirateBay');
            // this.electron.TorrentSearch.enableProvider('Torrent9');
            let torrents = await this.electron.TorrentSearch.search(
                title,
                cat,
                limit
            )
            //    let torrents = await this.electron.TorrentSearch.search(['1337x', 'ThePirateBay','Torrent9'], title, cat , limit);

            return torrents
        } catch (error) {
            throwError(error)
        }
    }

    // async pirateBayTop(cat){
    //   const searchResults = await this.PirateBay.topTorrents(cat);

    //   return searchResults;
    //  }

    //  async pirateBaySearch( keyword , cat){
    //   const searchResults = await this.PirateBay.search( keyword , {
    //     category: cat,
    //     orderBy: 'seeds',
    //     sortBy: 'desc'
    //   })
    //   return searchResults;
    // }

    async downloadTorrent(torrent) {
        return await this.electron.TorrentSearch.downloadTorrent(
            torrent,
            'C:\\Users\\shadow\\Downloads\\Compressed'
        )
    }

    /* download torrent */
    async downloadMagnet(torrent) {
        await this.electron.TorrentSearch.getMagnet(torrent)
            .then(magnet => {
                this.electron.shell.openExternal(magnet)
            })
            .catch(err => {
                console.log(err)
                return err
            })
    }
}
