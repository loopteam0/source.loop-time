import { Component ,  OnInit, OnDestroy } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { SearchService } from '../../services/search.service';
import { tap } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit, OnDestroy {
  errorState = false;
  showDetails;
  episodes ;
  Id;
  imdb_id;
  showDataloading;
  episodesLoading;
  length;

  constructor( private request: SearchService, public snackBar: MatSnackBar, private route: ActivatedRoute)
             {}


  requestShowDetails() {
    // start spinner
    this.showDataloading = true;
     /// get the details of the show from popCorn api
     this.request.getShowDetails(this.Id)
       .subscribe( data => {
        this.showDetails = data;
        this.showDataloading = false;
       this.errorState = false;
     }, err => {
       this.errorState = true;
       this.showDataloading = false;
     });

  }

  requestShowEpisodes(size, page) {
    // start spinner
    this.episodesLoading = true;
    // get the list of episodes form eztv
    this.request.getShowEpisopse(this.Id, size, page)
    .subscribe( (data) => {
      this.episodes = data['torrents'];
      this.length = data['torrents_count'];
      this.episodesLoading = false;
    }, err => this.showError(err));
  }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
        const imdb_id = params.get('imdb_id');
       // get imdb_id without tt
        this.Id = imdb_id.substr(2);
      });

      this.requestShowDetails();
      this.requestShowEpisodes(50, 1);
  }


  page(e) {
    console.log(e);
    this.episodesLoading = true;
    // get the list of episodes form eztv
    this.request.getShowEpisopse(this.Id, e.pageSize, (e.pageIndex + 1))
      .subscribe((data) => {
        this.episodes = data['torrents'];
        this.episodesLoading = false;
      });
  }

  RETRY(){
    this.requestShowDetails();
    this.requestShowEpisodes(50, 1);
  }

  openSnackBar(title: string) {
    this.snackBar.open(`Downloading ${title} ` , 'close');
  }

  showError(err){
    this.snackBar.open(err);
  }


  ngOnDestroy() {
  }
}
