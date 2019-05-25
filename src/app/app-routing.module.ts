import { NgModule } from '@angular/core'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'


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
    imports: [RouterModule.forRoot(routes, {useHash:true, preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule],
})
export class AppRoutingModule {}
