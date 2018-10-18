
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientJsonpModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule} from 'ngx-pagination';
import { MaterialModule } from './modules/material/material.module';
import { JsonpModule, HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { AdsPageComponent } from './components/ads-page/ads-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieDownloadDialogComponent } from './components/movie-details/movie-details.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ShowDetailsComponent } from './components/show-details/show-details.component';
import { ShowDownloadDialogComponent } from './components/show-details/show-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { QuoteComponent } from './components/quote/quote.component';

import { ServiceInterceptor } from './services/service.interceptor';
import { SanitizerPipe } from './pipes/sanitizer.pipe';
import { ConvertPipe } from './pipes/convert.pipe';
import { OpenExternalPipe } from './pipes/open-external.pipe';
import { SearchService } from './services/search.service';
import { ElectronService } from './services/electron.service';
import { DurationPipe } from './pipes/duration.pipe';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { ShowsListComponent } from './components/shows-list/shows-list.component';
import { AnimesListComponent } from './components/animes-list/animes-list.component';
import { FontModule } from './modules/font/font.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FanartTvService } from './services/fanart-tv.service';
import { MovieDbService } from './services/movie-db.service';
import { OtherMoviesComponent, OtherMovieDownloadDialogComponent } from './components/other-movies/other-movies.component';
import { MusicPageComponent } from './components/music-page/music-page.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { SoftwarePageComponent } from './components/software-page/software-page.component';
import { GamesPageComponent } from './components/games-page/games-page.component';
import { UndefinedPipe } from './pipes/undefined.pipe';
import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core/core.module';
import { TorrentModule } from './modules/torrent/torrent.module';
import { OthersModule } from './modules/others/others.module';
import { ShowDefaultDialogComponent } from './components/show-details/default-dialog-dialog/shows-download.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MovieDownloadDialogComponent,
    OtherMovieDownloadDialogComponent,
    ShowDownloadDialogComponent,
    ShowDefaultDialogComponent,
    SearchPageComponent,
    NavBarComponent,
    MainPageComponent,
    AdsPageComponent,
    MovieDetailsComponent,
    AboutPageComponent,
    ShowDetailsComponent,
    SpinnerComponent,
    SanitizerPipe,
    PageNotFoundComponent,
    ConvertPipe,
    QuoteComponent,
    OpenExternalPipe,
    DurationPipe,
    MoviesListComponent,
    ShowsListComponent,
    AnimesListComponent,
    OtherMoviesComponent,
    MusicPageComponent,
    BookPageComponent,
    SoftwarePageComponent,
    GamesPageComponent,
    UndefinedPipe,

  ],
  imports: [
      NgPipesModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, HttpClientJsonpModule,
    FormsModule, HttpModule,
    MaterialModule, ReactiveFormsModule,
    HttpClientModule, FontModule, FontAwesomeModule
,   SharedModule, CoreModule, TorrentModule, OthersModule,
    JsonpModule, NgxPaginationModule,
  ],
  providers: [ SearchService, MovieDbService , ElectronService , FanartTvService,DatePipe,
    { provide: HTTP_INTERCEPTORS,
      useClass: ServiceInterceptor,
      multi: true}
    ],
  bootstrap: [AppComponent],
  entryComponents: [MovieDownloadDialogComponent,ShowDownloadDialogComponent , ShowDefaultDialogComponent, OtherMovieDownloadDialogComponent]
})
export class AppModule {
 }
