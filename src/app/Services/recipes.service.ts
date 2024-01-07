import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { recetaDto, recetasListResponse, recetasResponse } from '../interfaces/recipes';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  _endpoint!: string;

  constructor(private _Cliente: HttpClient) {
    let { endpoint } = environment
    this._endpoint = endpoint
  }

  newRecipe(recipe: recetaDto): Observable<recetasResponse> {
    return this._Cliente.post<recetasResponse>(`${this._endpoint}Recipess`, recipe);
  }

  listRecipes(): Observable<recetasListResponse> {
    return this._Cliente.get<recetasListResponse>(`${this._endpoint}Recipess`)
  }
  myRecipes(idUser: number): Observable<recetasListResponse> {
    return this._Cliente.get<recetasListResponse>(`${this._endpoint}Recipess/${idUser}`)
  }
}
