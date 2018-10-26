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
  searched;
 // provider = '1337x';
  errorState = false;
  constructor(private Torrent: TorrentSearchApiService, private snackbar: MatSnackBar) {}

  ngOnInit() {
    this.showTorrents();
  }

  showTorrents() {
    this.searched = false;
    this.loading = true;
    this.Torrent.getTorrents("books", 'Other',100).then(res => {
      this.Others = res;
      this.loading = false;
    this.errorState = false;
    }, err => {
    this.errorState = true;
    this.loading = false;
    });
  }

  search(key) {
    this.searched = true;
    this.loading = true;
    this.errorState = false;
    this.Torrent.getTorrents(key, 'Other' , 50).then(res => {
      this.Others = res;
      this.loading = false;
      this.showError(`${this.Others.length} Results Found On ${key}`);
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
