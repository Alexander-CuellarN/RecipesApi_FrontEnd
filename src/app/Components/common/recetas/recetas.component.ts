import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Recipes } from 'src/app/interfaces/recipes';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})

export class RecetasComponent implements OnInit {
  @Input() content!: Recipes;
  descripcion!: string;

  constructor(private _dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this._dialog.open(DialogComponent, {
      data: this.content,
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }
}