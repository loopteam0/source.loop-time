import { Component , OnInit } from '@angular/core';
import { UiServiceService } from './services/ui-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  torrentSearch;
  IsWindowOnline = navigator.onLine;

  constructor(private UI: UiServiceService ) {}

ngOnInit() {
  
    window.addEventListener('online', () => 
    this.UI.openSnackBar(` ✅ You are back online `, 5000)
    );
       
    window.addEventListener('offline', () => {
      this.UI.openSnackBar(`❌ It seems you are offline; check your internet connection ` , null);    
    });

  }
  

}
