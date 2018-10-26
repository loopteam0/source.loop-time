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
  provider = '1337x';
  errorState = false;
  constructor(private Torrent: TorrentSearchApiService, private snackbar: MatSnackBar) {}

  ngOnInit() {
    this.show1337xTorrents();
  }

  show1337xTorrents() {
    this.searched = false;
    this.loading = true;
    this.errorState = false;
    this.Torrent.getTorrents("2018",'Games', 100).then(res => {
      this.Games = res;
      this.loading = false;
    this.errorState = false;
  }).catch(
    err => {
      this.loading = false;
      this.errorState = true;
    });
  }

  // showPirateTorrents() {
  //   this.searched = false;
  //   this.loading = true;
  //   this.errorState = false;
  //   this.Torrent.pirateBayTop(400).then(res => {
  //     this.Games = res;
  //     this.loading = false;
  //   this.errorState = false;
  // }).catch(
  //   err => {
  //     this.loading = false;
  //     this.errorState = true;
  //   });
  // }

  // onChange(e){
  //   if (e =='1337x') {
  //     this.show1337xTorrents();
  //   } else if(e == 'pirateBay'){
  //     this.showPirateTorrents();
  //   }else{
  //     this.show1337xTorrents();
  //   }
  //   console.log(e);
  // }


  // search( keyword,e){
  //   if (e =='1337x') {
  //     this.search1337x(keyword) ;
  //   } else if(e == 'pirateBay'){
  //     this.searchPirate(keyword);
  //   }else{
  //     this.show1337xTorrents();
  //   }
  // }


  search(key) {
    this.searched = true;
    this.loading = true;
    this.Torrent.getTorrents(key,'Games', 50).then(res => {
      this.Games = res;
      this.loading = false;
      this.showError(`${this.Games.length} Results Found On ${key}`);
  },
    err => {
    this.showError(err);
      this.loading = false;
    });
  }

  // searchPirate(title) {
  //   this.searched = true;
  //   this.loading = true;
  //   this.Torrent.pirateBaySearch(title, 400).then(res => {
  //     this.Games = res;
  //     this.loading = false;
  //     if (this.Games.length == 0) {
  //       this.showError(`${this.Games.length} Not Found`);
  //     }else {
  //       this.showError(`${this.Games.length} Results Found`);
  //     }
  // },
  //   err => {
  //   this.showError(err);
  //     this.loading = false;
  //   });
  // }

  download(torrent) {
    this.Torrent.downloadMagnet(torrent);
  }

  showError(err){
    this.snackbar.open(err);
  }
}
