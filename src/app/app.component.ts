import { Component , OnInit, OnDestroy } from '@angular/core';
import { UiServiceService } from './services/ui-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ElectronService } from './services/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  torrentSearch: any;
  IsWindowOnline = navigator.onLine;
  subscription: Subscription;

  constructor(private UI: UiServiceService, private router: Router ) {}

ngOnInit() {

    window.addEventListener('online', () =>
    this.UI.openSnackBar(` ✅ You are back online `, 5000)
    );

    window.addEventListener('offline', () => {
      this.UI.openSnackBar(`❌ It seems you are offline; check your internet connection and Retry` , null);
    });


    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => window.scrollTo( 0, 0));


  }



 ngOnDestroy(){
   this.subscription.unsubscribe()
 }
}
