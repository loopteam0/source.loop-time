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
  errorState = false;
  constructor(private Torrent: TorrentSearchApiService, private snackbar: MatSnackBar) {}

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
