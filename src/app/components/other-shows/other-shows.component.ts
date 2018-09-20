import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { MovieDbService } from '../../services/movie-db.service';
import { TorrentSearchApiService } from '../../services/torrent-search-api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-other-shows',
  templateUrl: './other-shows.component.html',
  styleUrls: ['./other-shows.component.scss']
})
export class OtherShowsComponent implements OnInit {
  loading;
  parms;
  Id;
  details;
  imageurl;
  episodeloading;
  error;
  errorState = false;
  Loop = 'Loop for Available Episodes';
  episodes;
    
  constructor(
    private Torrent: TorrentSearchApiService,
    private route: ActivatedRoute,
    private movieDB: MovieDbService,
    private snackbar: MatSnackBar
  ) {
    
    this.imageurl = 'https://image.tmdb.org/t/p/w500';
  }

  ngOnInit() {
    // this the id of the movie form the route
    this.parms = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.Id = id;
      console.log(this.Id);
    });

    this.showDetails();
  }

  showDetails() {
    this.loading = true;
    this.movieDB.getDetails(this.Id, 'tv').subscribe(res => {
      this.details = res;
      this.loading = false;
    this.errorState = false;
    },err => {
    this.errorState = true;
    this.loading = false;
    });
  }

    
  showEpisode(keyword, limit) {
    let val = keyword;
    let newKeyword = val.replace(/:|-/g, ' ');

      this.Loop = 'Looping ...';
    this.episodeloading = true;
    this.Torrent.getMovies(`${newKeyword} HDTV`, limit).subscribe(data => {
      this.episodes = data;
      this.episodeloading = false;
      this.Loop = 'Loop Again';
  }, err => { 
    this.showError();
    this.episodeloading = false;
    this.Loop = 'loop Again';
  });
  }
    
   download(torrent) {
    this.Torrent.downloadMagnet(torrent);
  }  

  showError(){
    this.snackbar.open('An error error occured while Looping, Please loop Again', null ,{
      duration: 5000
    } )
  }
}
