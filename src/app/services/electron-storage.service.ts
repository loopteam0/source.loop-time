import { Injectable, OnInit } from '@angular/core';
import { ElectronService } from './electron.service';
import { ElectronStore }  from 'electron-store';

@Injectable({
  providedIn: 'root'
})
export class ElectronStorageService implements OnInit {

  public storage: typeof ElectronStore;
  public store: any;

  constructor( private electron: ElectronService              
      ) {
        
        if( this.electron.isElectron){
          this.storage = window.require('electron-store');
          this.store = new this.storage();
        } else{
          this.storage = window.require('electron-store'); 
        }
      }
      
      ngOnInit(){

      }

     storeItem(title, data: object){
       this.store.set(title , data);
       console.log(title,[ data]);
       
      }  

     getItem(title){
       this.store.get(title);
       console.log(this.store.get(title));
       
     }

     deleteItem(){
       this.store.delete()
     }

}
