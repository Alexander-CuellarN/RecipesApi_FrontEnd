import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './Components/common/signin/signin.component';
import { MainComponent } from './Components/main/main.component';
import { HomeComponent } from './Components/home/home.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path:"Home", component:HomeComponent, canActivate: [AuthGuard]},
  { path:"Home/:action", component:HomeComponent, canActivate: [AuthGuard] },
  { path: "signin", component: SigninComponent },
  { path: "**", component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
