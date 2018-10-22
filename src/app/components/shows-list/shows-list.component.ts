import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SearchService } from '../../services/search.service';
import { ShowDetailsComponent } from '../show-details/show-details.component';



@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.scss']
})
export class ShowsListComponent implements OnInit {

  public Shows;
  public Pages;
  pagination: boolean = true;
  errorState;
  retryIndex = 1;
  home = false;
  showsLoading;

  /** PAGINATION */
  length = 2504;
  pageSize = 50;
  pageIndex;
  pageSizeOptions = [50, 30, 10];

  constructor(
    private dialog: MatDialog,
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
    this.pagination = false;
    this.request.getShowsList(i).subscribe(data => {
      this.Shows = data;
      this.showsLoading = false;
      this.pagination = true;
    this.errorState = false;
  }, err =>{
    this.showError(err);
    this.errorState = true;
    this.showsLoading = false;

  });

  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(ShowDetailsComponent, {
      data: {
        id: data
      },
      height: '95vh',
      width: '90vw',
      panelClass: 'Download-dialog',
      restoreFocus: false,
      autoFocus: false,
      id: 'Download-dialog'
      // maxWidth: '90vw',
      // maxHeight: '95vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }


  search(keyword) {
    this.showsLoading = true;
    this.errorState = false;
    this.home = true;
    this.pagination = false;
    this.request.getShowsByKeyword(keyword).subscribe(
      data =>{
         this.Shows = data
         this.showsLoading = false;

        }, err => {
          this.showError(err);
          this.showsLoading = false;

        }
    )
  }

  Retry() {
    this.home = false;
    this.errorState = false;
    this.requestShowList(this.retryIndex);
  }

  Page(e) {
    this.retryIndex = (e.pageIndex + 1);
      this.showsLoading = true;
      this.errorState = false;
      this.opensnackbar((e.pageIndex + 1));;
     this.request.getShowsList((e.pageIndex + 1)).subscribe(data => {
      this.Shows = data;
      this.showsLoading = false;
     this.errorState = false;
   }, err => {
     this.showError(err);
     this.showsLoading = false;
     this.errorState = true;
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

  // onSelectShow(show) {
  //   this.router.navigate(['/shows', show.imdb_id]);
  // }

 navigateTop() {
    window.scrollTo(0, 0);
  }
}


