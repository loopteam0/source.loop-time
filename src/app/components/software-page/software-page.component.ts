import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { TorrentSearchApiService } from '../../services/torrent-search-api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-software-page',
  templateUrl: './software-page.component.html',
  styleUrls: ['./software-page.component.scss']
})
export class SoftwarePageComponent implements OnInit {

 // dataSource = new TorrentSource(Torrent);
  Softwares;
  loading;
  searching;
  results;
  errorState = false;
  searched: boolean;
  provider = '1337x';
  constructor(private Torrent: TorrentSearchApiService, private snackbar: MatSnackBar) { }


  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  ngOnInit() {
  //  this.dataSource.paginator = this.paginator;

  this.showSoftwares() ;
  }


  showSoftwares() {
    this.searched = false;
     this.loading = true;
    this.Torrent.getTorrents('2018' ,'Applications', 100 ).then(
      res => {
        this.Softwares = res;
        this.loading = false;
        this.errorState = false;
    },
      err =>{
        this.showError(err);
        this.loading = false;
      this.errorState = true;
   });

  }


  search(key) {
    this.searched = true;
    this.loading = true;
    this.errorState = false;
    this.Torrent.getTorrents(key ,'Applications', 50).then(
      res => {
        this.Softwares = res;
        this.loading = false;
        this.showError(`${this.Softwares.length} Results Found On ${key}`);

    },
      err => {
        this.showError(err);
        this.loading = false;
    });

  }

  download(item) {
    this.Torrent.downloadMagnet(item);
  }

  showError(err){
    this.snackbar.open(err);
  }


}

// tslint:disable-next-line:class-name
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



