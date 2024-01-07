import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/common/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { LaterMenuComponent } from './Components/later-menu/later-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificacionComponent } from './Components/common/notificacion/notificacion.component';
import { HttpClient, HttpClientModule} from "@angular/common/http"
import { LoginService } from './Services/login.service';
import { SigninComponent } from './Components/common/signin/signin.component';
import { MainComponent } from './Components/main/main.component';
import { HomeComponent } from './Components/home/home.component';
import { ModalComponent } from './Components/User/modal/modal.component';
import { RecetasComponent } from './Components/common/recetas/recetas.component';
import { DialogComponent } from './Components/common/recetas/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LaterMenuComponent,
    NotificacionComponent,
    SigninComponent,
    MainComponent,
    HomeComponent,
    ModalComponent,
    RecetasComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
