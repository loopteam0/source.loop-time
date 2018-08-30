import { Component ,  OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';

import { SearchService } from '../../services/search.service';


@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.scss']
})
export class AnimeDetailsComponent implements OnInit {

  loading: boolean;
  animeDetails;
  episodes ;
  Id;
  imdb_id;

  constructor( private request: SearchService, private route: ActivatedRoute) {
    this.loading = true;
   }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      const imdb_id = params.get('_id');
     // get imid_id without tt
      this.Id = imdb_id;
    });

    // get the details af the anime
    this.requestAnimeDetails();
  }


  requestAnimeDetails() {
    /// get the details of the show from popCorn api
    this.request.getAnimeDetails(this.Id)
    .subscribe( data => {
      console.log(data);
     this.animeDetails = data;
     this.loading = false;
     } );

 }
}
