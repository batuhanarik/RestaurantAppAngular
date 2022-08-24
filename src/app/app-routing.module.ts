import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RestaurantDashComponent } from './components/restaurant-dash/restaurant-dash.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginguardService } from './services/loginguard.service';

const routes: Routes = [
{
  path:'',redirectTo:'login',pathMatch: 'full'
},
{
  path:'login',component:LoginComponent
},
{
  path:'signup',component:SignupComponent
},
{
  path:'restaurant',component:RestaurantDashComponent,canActivate: [LoginguardService]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
