import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { TorrentSearchApiService } from "../../services/torrent-search-api.service";
import { MatSnackBar } from '@angular/material';

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
  retry = false;
  constructor(private Torrent: TorrentSearchApiService, private snackbar: MatSnackBar) {}

  ngOnInit() {
    this.showTorrents();
  }

  showTorrents() {
    this.loading = true;
    this.Torrent.getAnimes('anime', 50).subscribe(res => {
      this.animes = res;
      this.loading = false;
    this.retry = false;
  },
    err => {
      this.loading = false;
    this.retry = true;
    });
  }

  searchTorrents(title) {
    this.searchLoading = true;
    this.Torrent.getAnimes(title, 30).subscribe(res => {
      this.results = res;
      this.searchLoading = false;
  },
    err => {
      this.showError(err);
      this.searchLoading = false;
    });
  }

  download(torrent) {
    this.Torrent.downloadMagnet(torrent);
  }

  showError(err){
    this.snackbar.open(err);
  }
}
