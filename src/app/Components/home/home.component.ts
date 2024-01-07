import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../User/modal/modal.component';
import { RecipesService } from 'src/app/Services/recipes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { showNotificaction } from '../../utils/notifications'
import { Recipes } from 'src/app/interfaces/recipes';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FavoritesService } from 'src/app/Services/favorites.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private _Client: RecipesService,
    private _snackBar: MatSnackBar,
    private router: ActivatedRoute,
    private _FavoriteService: FavoritesService,
    private _route: Router) { }

  recetaList!: Recipes[]
  optionMenu = "home"
  ngOnInit() {

    this.router.paramMap.subscribe({
      next: (data) => {
        this.recetaList = []
        let action = data?.get("action")
        if (!action) return
        let [{ idusuario }] = JSON.parse(localStorage.getItem("userLogged")!)

        if (action === "Favoritos") {
          this.optionMenu = "Favoritos"
          this._FavoriteService.myFovorites(idusuario).subscribe({
            next: ({ data }: { data: Recipes[] }) => this.recetaList = data
          })
          return
        }

        if (action === "Creados") {
          this.optionMenu = "Creados"
          this._Client.myRecipes(idusuario).subscribe({
            next: ({ data }: { data: Recipes[] }) => this.recetaList = data
          })
          return
        }
      }
    })

    this._Client.listRecipes().subscribe({
      next: ({ data }: { data: Recipes[] }) => {
        this.recetaList = data
      },
      error: ({ message }) => showNotificaction(message, '❌', this._snackBar)
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.recetaList.push(result)
    });
  }

  

  Login() {
    localStorage.removeItem('userLogged')
    this._route.navigate(["/"])
  }

}
