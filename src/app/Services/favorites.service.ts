import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { favoriteSctuture, responseIsFavorite } from '../interfaces/Favorites';
import { recetasListResponse } from '../interfaces/recipes';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  _endpoint!: string
  constructor(private _client: HttpClient) {
    let { endpoint } = environment
    this._endpoint = endpoint
  }

  isFavorite(idUser: number, idRecepe: Number): Observable<responseIsFavorite> {
    return this._client.get<responseIsFavorite>(`${this._endpoint}Favoritos/${idUser}/${idRecepe}`)
  }

  addFavorite(addfavorite:favoriteSctuture): Observable<responseIsFavorite> {
    return this._client.post<responseIsFavorite>(`${this._endpoint}Favoritos`, addfavorite);
  }

  removeFavorite(idUser: number, idRecepe: Number): Observable<responseIsFavorite> {
    return this._client.delete<responseIsFavorite>(`${this._endpoint}Favoritos/${idUser}/${idRecepe}`);
  }

  myFovorites(idUser: number): Observable<recetasListResponse> {
    return this._client.get<recetasListResponse>(`${this._endpoint}Favoritos/${idUser}`)
  }
  
}
