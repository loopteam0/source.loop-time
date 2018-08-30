import { Component, OnInit } from "@angular/core";
import { TorrentSearchApiService } from "../../services/torrent-search-api.service";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "app-games-page",
  templateUrl: "./games-page.component.html",
  styleUrls: ["./games-page.component.scss"]
})
export class GamesPageComponent implements OnInit {
  games;
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
    this.Torrent.getGames("2018", 50).subscribe(res => {
      this.games = res;
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
    this.Torrent.getGames(title, 30).subscribe(res => {
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
