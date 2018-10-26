import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { TorrentSearchApiService } from "../../services/torrent-search-api.service";
import { ThePirateBay } from 'thepiratebay';
 import { TorrentSearchApi } from 'torrent-search-api';
//import { TorrentSearchApi } from '../../services/torrent-search-api';
import { MatSnackBar } from '@angular/material';
import { ElectronService } from "../../services/electron.service";

@Component({
  selector: "app-animes-list",
  templateUrl: "./animes-list.component.html",
  styleUrls: ["./animes-list.component.scss"]
})
export class AnimesListComponent implements OnInit {
  animes;
  results;
  loading;
  searchLoading;
  searched = false;
  errorState = false;

  constructor(
    private Torrent: TorrentSearchApiService,
    private snackbar: MatSnackBar) {}

  ngOnInit() {
   this.showTorrents();

  }


  showTorrents() {
    this.searched = false;
    this.loading = true;
    this.errorState = false;
    this.Torrent.getTorrents('1080','Anime', 100).then(torrents => {
        this.animes = torrents;
        this.errorState = false;
        this.loading = false;

  },
    err => {
      this.showError(err);
      this.loading = false;
      this.errorState = true;
    });
  }

  search(key) {

    this.searched = true;
    this.loading = true;
    this.errorState = false;
    this.Torrent.getTorrents(key,'Anime', 50).then(res => {
      this.animes = res;
      this.loading = false;
      this.showError(`${this.animes.length} Results Found For ${key}`);
  },
    err => {
      this.showError(err);
      this.loading = false;
    });
  }

  download(torrent) {
    this.Torrent.downloadMagnet(torrent);
  }

  showError(err, duration= 5000){
    this.snackbar.open(err, null , {
      duration: duration
    })
  }
}
