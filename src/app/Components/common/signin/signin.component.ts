import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';
import { User, usersResponse } from 'src/app/interfaces/user';
import { showNotificaction } from '../../../utils/notifications'
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../login/login.component.css', './signin.component.css']
})
export class SigninComponent {

  @Output() emisor = new EventEmitter();

  constructor(private _fb: FormBuilder, private _services: LoginService,
    private _snackBar: MatSnackBar, private _route:Router) {

  }

  myform = this._fb.group({
    NombreUsuario: ['', Validators.required],
    CorreoElectronico: ['', Validators.required],
    Contraseña: ['', Validators.required]
  });

  SingIn() {
    this.emisor.emit("login")
  }

  handlerSingIn(form: FormGroup) {
    if (!this.myform.valid) return

    let user: User = {
      Contraseña: form.value.Contraseña,
      CorreoElectronico: form.value.CorreoElectronico,
      NombreUsuario: form.value.NombreUsuario
    }
    this._services.signIn(user).subscribe({
      next: (respose: usersResponse) => {
        let { message, data } = respose
        localStorage.setItem("userLogged", JSON.stringify(data))
        showNotificaction(message, "✅", this._snackBar)
        this._route.navigate(['/Home'])
      },
      error: (respose: usersResponse) => {
        let { message } = respose
        showNotificaction(message, "❌", this._snackBar)
      }
    })
  }
}