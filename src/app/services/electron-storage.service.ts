import { Injectable, OnInit } from '@angular/core';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class ElectronStorageService implements OnInit {



  constructor( private electron: ElectronService
      ) {

        
      }

      ngOnInit(){

      }


}
