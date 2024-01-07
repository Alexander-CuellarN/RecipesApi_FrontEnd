import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { FavoritesService } from 'src/app/Services/favorites.service';
import { favoriteSctuture } from 'src/app/interfaces/Favorites';
import { Recipes } from 'src/app/interfaces/recipes';
import { showNotificaction } from 'src/app/utils/notifications';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recipes,
    private _services: FavoritesService,
    private _snackBar: MatSnackBar
  ) { }

  isFavorite: boolean = false

  ngOnInit(): void {
    let [{ idusuario }] = JSON.parse(localStorage.getItem("userLogged")!)
    this._services.isFavorite(idusuario, this.data.idreceta!).subscribe({
      next: ({ data }) => this.isFavorite = data,
      error: ({ message }) => showNotificaction(message, '❌', this._snackBar)
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addFavorite(idReceta: number) {
    let [{ idusuario }] = JSON.parse(localStorage.getItem("userLogged")!)
    
    let data: favoriteSctuture = {
      idReceta,
      idUsuario: idusuario
    }

    let services: Subscription = this._services.addFavorite(data).subscribe({
      next: ({ message }) => {
        showNotificaction(message, '✅', this._snackBar)
        this.isFavorite = !this.isFavorite
      },
      error: ({ message }) => showNotificaction(message, '❌', this._snackBar),
      complete: () => services.unsubscribe()
    })
  }

  removefavorites(idReceta: number) {
    let [{ idusuario }] = JSON.parse(localStorage.getItem("userLogged")!)

    let services: Subscription = this._services.removeFavorite(idusuario, idReceta).subscribe({
      next: ({ message }) => {
        showNotificaction(message, '✅', this._snackBar)
        this.isFavorite = !this.isFavorite
      },
      error: ({ message }) => showNotificaction(message, '❌', this._snackBar),
      complete: () => services.unsubscribe()
    })
  }
}

