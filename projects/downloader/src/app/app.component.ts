import { Component ,OnInit} from '@angular/core';
import { MatProgressBar, ThemePalette } from '@angular/material';
import { ElectronService } from './services/electron/electron.service';

  export interface color {
    name: string,
    color: string
  }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'downloader';
  bufferValue:number = 10;
  color:ThemePalette = 'warn';
  value:number = 50;
  buffer:boolean = false
  mode = {
    onLoading: 'buffer',
    onBegin: 'indeterminate',
    onFinished: 'determinate'
  };

   constructor(private modules: ElectronService ){}

   ngOnInit(): void {
     //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
     //Add 'implements OnInit' to the class.



   }
}
