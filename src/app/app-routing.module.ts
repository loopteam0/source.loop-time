import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// import { AboutPageComponent } from './components/about-page/about-page.component'
import { MovieDetailsComponent } from './components/movie-details/movie-details.component'
import { SearchPageComponent } from './components/search-page/search-page.component'
import { MainPageComponent } from './components/main-page/main-page.component'
import { ShowDetailsComponent } from './components/show-details/show-details.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { AnimesListComponent } from './components/animes-list/animes-list.component'
import { ShowsListComponent } from './components/shows-list/shows-list.component'
import { MoviesListComponent } from './components/movies-list/movies-list.component'
import { OtherMoviesComponent } from './components/other-movies/other-movies.component'
import { GamesPageComponent } from './components/games-page/games-page.component'
import { BookPageComponent } from './components/book-page/book-page.component'
import { MusicPageComponent } from './components/music-page/music-page.component'
import { SoftwarePageComponent } from './components/software-page/software-page.component'
import { FavoritesComponent } from './components/favorites/favorites.component'

/// import { DownloadPageComponent } from './components/download-page/download-page.component';
/// import { SettingsPageComponent } from 'src/app/components/settings-page/settings-page.component';

const routes: Routes = [
    { path: '', redirectTo: '/trending', pathMatch: 'full' },
    {
        path: 'trending',
        loadChildren: './components/main-page/main-page.module#MainPageModule',
    },
    {
        path: 'movies',
        loadChildren:
            './components/movies-list/movies-list.module#MoviesListModule',
    },
    {
        path: 'shows',
        loadChildren:
            './components/shows-list/shows-list.module#ShowsListModule',
    },
    {
        path: 'animes',
        loadChildren:
            './components/animes-list/animes-list.module#AnimesPageModule',
    },
    {
        path: 'books',
        loadChildren: './components/book-page/book-page.module#BookPageModule',
    },
    {
        path: 'games',
        loadChildren:
            './components/games-page/games-page.module#GamesPageModule',
    },
    {
        path: 'musics',
        loadChildren:
            './components/music-page/music-page.module#MusicPageModule',
    },
    {
        path: 'softwares',
        loadChildren:
            './components/software-page/software-page.module#SoftwarePageModule',
    },
    {
        path: 'search',
        loadChildren:
            './components/search-page/search-page.module#SearchPageModule',
    },
    {
        path: 'favorites',
        loadChildren: './components/favorites/favorites.module#FavoritesModule',
    },
    {
        path: 'about',
        loadChildren: './components/about-page/about.module#AboutPageModule',
    },
    {
        path: '**',
        loadChildren:
            './components/page-not-found/page-not-found.module#PageNotFoundModule',
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
