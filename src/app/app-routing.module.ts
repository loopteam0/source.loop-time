import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutPageComponent } from './components/about-page/about-page.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ShowDetailsComponent } from './components/show-details/show-details.component';
import { AnimeDetailsComponent } from './components/anime-details/anime-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AnimesListComponent } from './components/animes-list/animes-list.component';
import { ShowsListComponent } from './components/shows-list/shows-list.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { OtherMoviesComponent } from './components/other-movies/other-movies.component';
import { GamesPageComponent } from './components/games-page/games-page.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { MusicPageComponent } from './components/music-page/music-page.component';
import { SoftwarePageComponent } from './components/software-page/software-page.component';
import { OtherShowsComponent } from './components/other-shows/other-shows.component';


/// import { DownloadPageComponent } from './components/download-page/download-page.component';
/// import { SettingsPageComponent } from 'src/app/components/settings-page/settings-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/trending', pathMatch: 'full' },
  {path: 'trending', component: MainPageComponent},
  {path: 'movies', component: MoviesListComponent},
  {path: 'shows', component: ShowsListComponent},
  {path: 'animes', component: AnimesListComponent},
  {path: 'movies/:imdb_id', component: MovieDetailsComponent },
  {path: 'shows/:imdb_id', component: ShowDetailsComponent },
  {path: 'animes/:_id', component: AnimeDetailsComponent},
  {path: 'trending/movies/:id', component: OtherMoviesComponent},
  {path: 'trending/shows/:id', component: OtherShowsComponent},
  {path: 'books', component: BookPageComponent},
  {path: 'games', component: GamesPageComponent},
  {path: 'musics', component: MusicPageComponent},
  {path: 'softwares', component: SoftwarePageComponent},
  {path: 'search', component: SearchPageComponent},
  {path: 'about', component: AboutPageComponent},
  {path: '**' , component: PageNotFoundComponent }
  // {path: 'settings', component: SettingsPageComponent},
  /// {path: 'downloads', component: DownloadPageComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
