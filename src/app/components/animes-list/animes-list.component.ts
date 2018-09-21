import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { TorrentSearchApiService } from "../../services/torrent-search-api.service";
import { TorrentSearchApi } from '../../../assets/providers/torrent-search-api';
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
  TorrentApi;
  errorState = false;

  constructor(private Torrent: TorrentSearchApiService, 
    private snackbar: MatSnackBar,
     private electron: ElectronService) {

      if (this.electron.isElectron()) {
        this.TorrentApi = window.require('torrent-search-api')
      }

     }

  ngOnInit() {
    this.showTorrents();
  }

  showTorrents() {
    this.loading = true;
    this.Torrent.getAnimes('anime', 50).subscribe(res => {
      this.animes = res;
      this.loading = false;
    this.errorState = false;
  },
    err => {
      this.loading = false;
      this.errorState = true;
    });
  }

  search(title) {
    this.searchLoading = true;
    this.Torrent.getAnimes(title, 50).subscribe(res => {
      this.animes = res;
      this.loading = false;
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
