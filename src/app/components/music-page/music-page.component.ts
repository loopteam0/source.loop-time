import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { TorrentSearchApiService } from '../../services/torrent-search-api.service';

@Component({
  selector: `app-music-page`,
  templateUrl: `./music-page.component.html`,
  styleUrls: [`./music-page.component.scss`]
})
export class MusicPageComponent implements OnInit {
 Results;   
 loading;
 searchLoading;
 musics;  
  retry = false;   
  constructor(private Torrent: TorrentSearchApiService,private snackbar: MatSnackBar ) {
   
  }
// dataSource = new MatTableDataSource<torrent>(this.Results);


  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  ngOnInit() {
    this.showMusics();
  }

  showMusics() {
    this.loading = true;
    this.Torrent.getMusics('2018', 50)
      .subscribe(torrents => {     
        this.musics = torrents;
        this.loading = false;
      this.retry = false;
      },
        err => {
      this.retry = true;
      this.loading = false;

        }
      );
  }

   searchMusic(title){
       this.searchLoading = true;
    this.Torrent.getMusics(title, 30)
      .subscribe(torrents => {     
        this.Results = torrents;
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

export interface torrent {
  title?: string;
  size?: string;
  seeds?: number;
  peers?: number;
  time?: string;
  magnet?: string;
  desc?: string;
  provider?: string;
}
