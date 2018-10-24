import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favoriteMovies: Array<object> = [];
  favoriteShows: Array<object> [];


  constructor() { }

}
