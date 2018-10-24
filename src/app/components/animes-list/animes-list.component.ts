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
    this.Torrent.getAnimes('1080', 50).then(torrents => {
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

  search(title) {
    
    this.searched = true;
    this.loading = true;
    this.errorState = false;
    this.Torrent.getAnimes(title, 50).then(res => {
      this.animes = res;
      this.loading = false;
      if (this.animes.length == 0) {  
        this.showError(`${this.animes.length} Not Found`);
      }else {
        this.showError(`${this.animes.length} Results Found`);
      }
  },
    err => {
      this.showError(err);
      this.loading = false;
    });
  }

  download(torrent) {
    this.Torrent.downloadMagnet(torrent);
  }

  showError(err){
    this.snackbar.open(err);
  }
}
