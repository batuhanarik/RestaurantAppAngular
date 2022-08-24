import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
declare let alertify;

@Injectable({
  providedIn: 'root'
})
export class LoginguardService implements CanActivate {

  constructor(private apiService:ApiService,private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let logged = this.apiService.isLoggedIn;

    if(logged === true){
      return true;
    } 
    this.router.navigate(["login"]);
    alertify.error("You must log in to the system to access the page!!");
    return false;
  }
}
