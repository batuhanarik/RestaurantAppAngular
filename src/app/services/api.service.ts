import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  isLoggedIn: boolean = false;
  apiUrl = 'http://localhost:3000/posts/';
  constructor(private _http: HttpClient) {}
  //Add Restaurant
  addRestaurant(data: any) {
    return this._http.post<any>(this.apiUrl, data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  //Get Restaurants
  getRestaurants() {
    return this._http.get<any>(this.apiUrl).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //Update Restaurant
  updateRestaurant(data: any,id:number) {
    return this._http.put<any>(`${this.apiUrl}${id}`, data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  //Delete Restaurant
  deleteRestaurant(id:number) {
    return this._http.delete<any>(`${this.apiUrl}${id}`).pipe(
      map((res) => {
        return res;
      })
    );
  }
  //Login
  logIn(){
    return this._http.get<any>("http://localhost:3000/signup/").pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
