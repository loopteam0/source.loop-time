import { Component, OnInit } from "@angular/core";
import { TorrentSearchApiService } from "../../services/torrent-search-api.service";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "app-games-page",
  templateUrl: "./games-page.component.html",
  styleUrls: ["./games-page.component.scss"]
})
export class GamesPageComponent implements OnInit {
  Games;
  PirateGames;
  loading;
  searched;
  errorState = false;
  constructor(private Torrent: TorrentSearchApiService, private snackbar: MatSnackBar) {}

  ngOnInit() {
    this.showTorrents();
    this.pirateGet();
  }

  showTorrents() {
    this.searched = false;
    this.loading = true;
    this.errorState = false;
    this.Torrent.getGames("2018", 50).then(res => {
      this.Games = res;
      this.loading = false;
    this.errorState = false;
  }).catch(
    err => {
      this.loading = false;
      this.errorState = true;
    });
  }

  pirateGet(){
    this.Torrent.pirateBayTop(400).then(
      res =>{
         console.log(res);
        this.PirateGames = res;
        }
    ).catch(
      err => {
        console.log(err)
      }
    )
  }

  search(title) {
    this.searched = true;
    this.loading = true;
    this.Torrent.getGames(title, 30).then(res => {
      this.Games = res;
      this.loading = false;
      if (this.Games.length == 0) {  
        this.showError(`${this.Games.length} Not Found`);
      }else {
        this.showError(`${this.Games.length} Results Found`);
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
