import { Component, OnInit } from '@angular/core';
 import { UiServiceService } from 'src/app/services/ui-service.service';
import { TorrentSearchApiService } from 'src/app/services/torrent-search-api.service';

export interface Category {
  name: string;
  value: number;
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  Results: Array<any>;
  loading: boolean;
  searched: boolean;
  errorState: boolean;
  message: string;

  //////search config
  limit: number = 20;
  category: Category[] = [
    {
      name: '10',
      value: 10
    },{
      name: '20',
      value: 20
    },{
      name: '50',
      value: 50
    },{
      name: '100',
      value: 100
    }
  ];

  constructor(
    private UI: UiServiceService,
     private Torrent: TorrentSearchApiService
    ) {}

    ngOnInit(){
      let msg = `Showing Top ${this.limit} Torrents of the Day`;
      this.search('' , 'Top100', msg);
    }

  search(keyword: string, category: string= 'All' , message = `Showing Top ${this.limit} Results on {${keyword}}` ) {
    this.searched = false;
    this.loading = true;
    this.Torrent.getTorrents( keyword, category , this.limit).then(res => {
      this.Results = res;
      this.loading = false;
      this.errorState = false;
      this.UI.openSnackBar(`${this.Results.length || 0 } Items Found`, 3000);
      this.message = message;
    }, err => {
    this.errorState = true;
    this.loading = false;
    this.UI.openSnackBar(`${err} Try Again`, 3000);
    this.message = '';
    });
  }


  download(url){
    this.Torrent.downloadMagnet(url)
  }


}
