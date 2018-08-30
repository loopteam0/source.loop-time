import { Component, OnInit } from "@angular/core";
import { TorrentSearchApiService } from "../../services/torrent-search-api.service";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "app-book-page",
  templateUrl: "./book-page.component.html",
  styleUrls: ["./book-page.component.scss"]
})
export class BookPageComponent implements OnInit {
  others;
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
    this.Torrent.getOthers("books", 50).subscribe(res => {
      this.others = res;
      this.loading = false;
    this.retry = false;
    }, err => {
    this.retry = true;
    this.loading = false;
    });
  }

  searchTorrents(title) {
    this.searchLoading = true;
    this.Torrent.getOthers(title, 30).subscribe(res => {
      this.results = res;
      this.searchLoading = false;
    }, err => {
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
