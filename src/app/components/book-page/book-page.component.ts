import { Component, OnInit } from "@angular/core";
import { TorrentSearchApiService } from "../../services/torrent-search-api.service";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "app-book-page",
  templateUrl: "./book-page.component.html",
  styleUrls: ["./book-page.component.scss"]
})
export class BookPageComponent implements OnInit {
  Others;
  loading;
  searchLoading;
  errorState = false;
  constructor(private Torrent: TorrentSearchApiService, private snackbar: MatSnackBar) {}

  ngOnInit() {
    this.showTorrents();
  }

  showTorrents() {
    this.loading = true;
    this.Torrent.getOthers("books", 50).then(res => {
      this.Others = res;
      this.loading = false;
    this.errorState = false;
    }, err => {
    this.errorState = true;
    this.loading = false;
    });
  }

  search(title) {
    this.loading = true;
    this.errorState = false;
    this.Torrent.getOthers(title, 30).then(res => {
      this.Others = res;
      this.loading = false;
    }, err => {
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
