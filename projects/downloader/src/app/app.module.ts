import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DownloadServiceService } from './services/download-service.service';
import { MaterialModule } from './modules/material/material.module';
import {ElectronService } from './services/electron/electron.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [DownloadServiceService, ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
