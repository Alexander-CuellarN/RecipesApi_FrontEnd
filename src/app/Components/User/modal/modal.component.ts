import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipesService } from 'src/app/Services/recipes.service';
import { Ingredientes, Pasos, Recipes, RecipesCreate, recetaDto } from 'src/app/interfaces/recipes';
import { showNotificaction } from 'src/app/utils/notifications';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(private _formBuilder: FormBuilder, private _Services: RecipesService, private _snackBar: MatSnackBar,  private dialogRef: MatDialogRef<ModalComponent>) { }

  firstFormGroup = this._formBuilder.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    tiempoPreparacion: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    nombre0: ['', Validators.required],
    cantidad0: ['', Validators.required],
    nombre1: [''],
    cantidad1: [''],
    nombre2: [''],
    cantidad2: [''],
    nombre3: [''],
    cantidad3: [''],
    nombre4: [''],
    cantidad4: ['']
  });

  thirthFormGroup = this._formBuilder.group({
    descripcion0: ['', Validators.required],
    orden0: ['', Validators.required],
    descripcion1: [''],
    orden1: [''],
    descripcion2: [''],
    orden2: [''],
    descripcion3: [''],
    orden3: [''],
    descripcion4: [''],
    orden4: [''],
  });

  repeatElements: number[] = [0, 0, 0, 0, 0]
  repeatpasos: number[] = [0, 0, 0, 0, 0]

  CrearReceta() {
    if (!this.firstFormGroup.valid && !this.secondFormGroup.valid && !this.thirthFormGroup.valid) return

    let ingredientesList: Ingredientes[] = []
    let pasosList: Pasos[] = []

    let Ingredientes = Object.values(this.secondFormGroup.value);
    let pasos = Object.values(this.thirthFormGroup.value);

    for (let x = 0; x <= 10; x += 2) {

      if (Ingredientes[x + 1] && Ingredientes[x]) {
        let ingrediente: Ingredientes = {
          cantidad: parseInt(Ingredientes[x + 1]!),
          nombre: Ingredientes[x]!,
        }
        ingredientesList.push(ingrediente)
      }

      if (pasos[x + 1] && pasos[x]) {
        let paso: Pasos = {
          orden: parseInt(pasos[x]!),
          descripcion: pasos[x + 1]!
        }
        pasosList.push(paso)
      }
    }

    let [{ idusuario, nombreUsuario }] = JSON.parse(localStorage.getItem('userLogged')!)

    let receta: RecipesCreate = {
      Descripcion: this.firstFormGroup.value.descripcion!,
      nombre: this.firstFormGroup.value.nombre!,
      tiempoPreparacion: parseInt(this.firstFormGroup.value.tiempoPreparacion!),
      idusuario: idusuario
    }

    let recetaDto: recetaDto = {
      ingredientesDto: ingredientesList,
      preparacionDto: pasosList,
      recetaDto: receta
    }
    
    let newRecetaShow: Recipes = {
        idusuario,
        nombre: receta.nombre,
        tiempoPreparacion: receta.tiempoPreparacion,
        descripcion: receta.Descripcion,
        pasos: pasosList,
        ingrediente: ingredientesList,
        idreceta: 0,
        nombreUsuario: nombreUsuario
    }
    
    this._Services.newRecipe(recetaDto).subscribe({
      next: ({data,  message }) => {
        showNotificaction(message, '✅', this._snackBar);
        let [{idreceta}] = data
        newRecetaShow.idreceta = idreceta; 
        this.dialogRef.close(newRecetaShow);
      },
      error: ({ message }) => showNotificaction(message, '❌', this._snackBar)
    })
  }
}

