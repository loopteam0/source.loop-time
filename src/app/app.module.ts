import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { MaterialModule } from './modules/material/material.module'
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgPipesModule } from 'ngx-pipes'
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { MovieDetailsComponent } from './components/movie-details/movie-details.component'
import { MovieDownloadDialogComponent } from './components/movie-details/movie-details.component'
import { ShowDetailsComponent } from './components/show-details/show-details.component'

import { ServiceInterceptor } from './services/service.interceptor'
import { SearchService } from './services/search.service'
import { ElectronService } from './services/electron.service'
import { FanartTvService } from './services/fanart-tv.service'
import { MovieDbService } from './services/movie-db.service'
import {
    OtherMoviesComponent,
    OtherMovieDownloadDialogComponent,
} from './components/other-movies/other-movies.component'
import { SharedModule } from './modules/shared/shared.module'
import { ShowDownloadDialogComponent } from './components/show-details/default-dialog-dialog/shows-download.component'
import { DatePipe } from '@angular/common'
import { UiServiceService } from './services/ui-service.service'
import { ElectronStorageService } from './services/electron-storage.service'
import { TorrentSearchApiService } from './services/torrent-search-api.service'
import { LoginComponent } from './components/login/login.component'
import { environment } from 'src/environments/environment'
import { AuthService } from './services/auth.service'
import { ThemeService } from './services/theme.service'
import { AppStateService } from './services/app-state.service'
import { SpinnerModule } from './components/spinner/spinner.module'

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,

        MovieDownloadDialogComponent,
        OtherMovieDownloadDialogComponent,
        ShowDownloadDialogComponent,

        MovieDetailsComponent,
        ShowDetailsComponent,
        OtherMoviesComponent,
        LoginComponent,
    ],
    imports: [
        SpinnerModule,
        NgPipesModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        AngularFireModule.initializeApp(environment.fireBase),
        AngularFireAuthModule,
    ],
    providers: [
        SearchService,
        MovieDbService,
        ElectronService,
        ElectronStorageService,
        FanartTvService,
        DatePipe,
        UiServiceService,
        AuthService,
        TorrentSearchApiService,
        ThemeService,
        AppStateService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ServiceInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        MovieDownloadDialogComponent,
        ShowDetailsComponent,
        LoginComponent,
        OtherMoviesComponent,
        MovieDetailsComponent,
        ShowDownloadDialogComponent,
        OtherMovieDownloadDialogComponent,
    ],
})
export class AppModule {}
