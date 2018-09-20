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
  softwares;
  loading;
  searching;
  results;
  errorState = false;
  constructor(private Torrent: TorrentSearchApiService, private snackbar: MatSnackBar) { }


  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  ngOnInit() {
  //  this.dataSource.paginator = this.paginator;

  this.showSoftwares() ;
  }


  showSoftwares() {
     this.loading = true;
    this.Torrent.getSoftwares('2018' , 50 ).subscribe(
      res => {
        this.softwares = res;
        this.loading = false;
        this.errorState = false;
    }, 
      err =>{
        this.showError(err);
        this.loading = false;
      this.errorState = true;
   });

  }


  searchSoftwares(key) {
    this.searching = true;
    this.Torrent.getSoftwares(key , 30).subscribe(
      res => {
        this.results = res;
        this.searching = false;
    }, 
      err => {
        this.showError(err);
        this.searching = false;
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


// export class TorrentSource extends DataSource<any> {

//     constructor(private Torrent: TorrentSearchApiService ) {
//         super();
//     }
// title;
// limit;
//     connect(): Observable<torrent[]> {
//       return  this.Torrent.getSoftwares();
//     }

//     disconnect() {}
// }
