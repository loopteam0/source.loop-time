import {Inject} from '@angular/core';
import {Component,OnInit,OnDestroy} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import {ElectronService} from '../../../services/electron.service';
import { SearchService } from 'src/app/services/search.service';
import { TorrentSearchApiService } from 'src/app/services/torrent-search-api.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component( {
  selector: 'show-dload-dialog',
    templateUrl: './show-download-dialog.html',
    styleUrls: ['./../show-download-dialog.scss']
})
export class ShowDownloadDialogComponent implements OnInit, OnDestroy {
  errorState: boolean=false;
  loadingShows:boolean = true;
  loadingError:boolean = false;
  loading = true;
  episodes;
  Id;
  length;
  completeEpisodes: any;

  constructor(public dialogRef: MatDialogRef<ShowDownloadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackBar: MatSnackBar,
    private UI: UiServiceService,
    private electron: ElectronService,
    private request: SearchService,
    private torrent: TorrentSearchApiService) {}

  ngOnInit() {
      this.requestShowEpisodes(50, 1);

      this.showCompleteEpisodes(this.data.seasons);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  requestShowEpisodes(size, page) {
    // start spinner
    this.loading=true;
    this.errorState=false;

    this.request.getShowEpisopse(this.data.imdbCode, size, page) .subscribe((data)=> {
      this.episodes=data['torrents'];
      this.length=data['torrents_count'];
      if(this.length==0){
        this.showError( `Nothing Found From EZTV` ,9000)
      }

      this.loading=false;
    } , err=> {
      this.showError(err);
      this.errorState=true;
      this.loading=false;
    });
  }

   showCompleteEpisodes(seasons=this.data.seasons) {
    this.loadingShows = true;
    this.loadingError = false;
    this.torrent.getTorrents(`${this.data.title} complete`, 'TV', seasons*4)
    .then(res=> {
       this.completeEpisodes = res;
       this.loadingError = false;
       this.loadingShows = false;
    }).catch( err => {
      this.showError(err);
      this.loadingError = true;
      this.loadingShows = false;
    })
  }


  page(e:any) {
    this.errorState=false;
    this.loading=true;
    this.request.getShowEpisopse(this.data.imdbCode, e.pageSize, (e.pageIndex + 1)) .subscribe((data)=> {
      this.episodes=data['torrents'];
      this.loading=false;
    }
    , err=> {
      this.showError(err);
      this.errorState=true;
      this.loading=false;
    });
  }




  download(url:any, snkMsg:string, quality?:string) {
    this.electron.shell.openExternal(url);
    this.openSnackBar(`${snkMsg} ${quality}`);
  }

  downloadTorrent(item){
    this.torrent.downloadMagnet(item).catch(
      res => {
        this.openSnackBar(res);
      }
    );
  }

  showError(err, duration = 6000) {
    this.snackBar.open(err, null , {
      duration: duration
    });
  }

  openSnackBar(msg: string) {
    this.UI.openSnackBar(`Downloading ${msg}`);
  }


  retry() {
    this.requestShowEpisodes(50, 1);
  }

  ngOnDestroy() {
    // this.request.getShowEpisopse(0 ,0,0).unsubscribe();
    //  this.episodes.unsubscribe();
  }

}
