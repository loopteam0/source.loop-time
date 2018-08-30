import { Component , OnInit } from '@angular/core';
import { SearchService } from './services/search.service';
import { ElectronService } from './services/electron.service';
import { map } from 'rxjs/operators';
import { TorrentSearchApiService } from './services/torrent-search-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  torrentSearch;
  Torrent;
	try = 'Anon: 2017 - new ' ;
  constructor( private torrent:TorrentSearchApiService ) {


  }

ngOnInit() {
 
}
}
