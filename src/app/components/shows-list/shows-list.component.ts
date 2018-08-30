import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SearchService } from '../../services/search.service';


@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.scss']
})
export class ShowsListComponent implements OnInit {

  public Shows;
  public Pages;
  retry;
  retryIndex = 1;

  showsLoading;

  /** PAGINATION */
  length = 2503;
  pageSize = 50;
  pageIndex;
  pageSizeOptions = [50, 30, 10];

  constructor(
    private request: SearchService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
   
  }


  ngOnInit() {
    this.requestShowList(1);

  }

  requestShowList(i) {
    this.showsLoading = true;
    this.request.getShowsList(i).subscribe(data => {
      this.Shows = data;
      this.showsLoading = false;
    this.retry = false;
  }, err =>{
    this.showError(err);
    this.retry = true;
    this.showsLoading = false;

  });

  }

  RETRY() {
    this.requestShowList(this.retryIndex);
    console.log(this.retryIndex);
  }

  Page(e) {
    this.retryIndex = (e.pageIndex + 1);
      this.showsLoading = true;
      this.opensnackbar((e.pageIndex + 1));;
     this.request.getShowsList((e.pageIndex + 1)).subscribe(data => {
      this.Shows = data;
      this.showsLoading = false;
     this.retry = false;
   }, err => { 
     this.showError(err);
     this.showsLoading = false;
     this.retry = true;
   });

  }

  showError(err){
    this.snackBar.open(err);
  }

  opensnackbar(index) {
    this.snackBar.open(`Shows: Page ${index} is loading please Wait . . . `);
  }
  opensnack() {
    this.snackBar.open(`Page 0 doesn't exist`);
  }

  onSelectShow(show) {
    this.router.navigate(['/shows', show.imdb_id]);
  }

 navigateTop() {
    window.scrollTo(0, 0);
  }
}


