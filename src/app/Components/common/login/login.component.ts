import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';
import { UserCredential } from 'src/app/interfaces/user-credential';
import {showNotificaction} from '../../../utils/notifications'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() emisor = new EventEmitter<string>();
  constructor(private _fb: FormBuilder, 
    private _services: LoginService,
    private _snackBar: MatSnackBar,
    private _router:Router) {

  }
  
  newform = this._fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  Login(form: FormGroup) {

    if (!form.valid) return
    let userCrendential: UserCredential = {
      CorreoElectronico: form.value.email,
      Contraseña: form.value.password
    }

    this._services.login(userCrendential).subscribe({
      next: (response) => {
        let { message, data} = response
        showNotificaction(message, '✅', this._snackBar)
        localStorage.setItem('userLogged', JSON.stringify(data))
        this._router.navigate(['/Home'])

      },
      error: (data) => showNotificaction(data.error.message, '❌', this._snackBar)
    })
  }

  SignIn(): void {
    this.emisor.emit("sigin");
  }
}
