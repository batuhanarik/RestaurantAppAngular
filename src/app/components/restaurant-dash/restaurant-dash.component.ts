import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantData } from 'src/app/models/resturant.model';
import { ApiService } from 'src/app/services/api.service';


declare let alertify;

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css'],
})
export class RestaurantDashComponent implements OnInit {
  formValue!: FormGroup;
  restaurant:RestaurantData = new RestaurantData();
  restaurants:RestaurantData[] = [];
  showAdd!:boolean;
  showBtn!:boolean;

  constructor(private formBuilder: FormBuilder,private api:ApiService,private router:Router) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    });

    this.getRestaurants();
  }

  clickAddRestaurant(){
    this.formValue.reset();
    this.showAdd=true;
    this.showBtn=false;

  }

  addRestaurant(){
    this.restaurant.name=this.formValue.value.name;
    this.restaurant.email = this.formValue.value.email;
    this.restaurant.mobile=this.formValue.value.mobile;
    this.restaurant.address=this.formValue.value.address;
    this.restaurant.services=this.formValue.value.services;

    this.api.addRestaurant(this.restaurant).subscribe(res=>{
      console.log(res);
      alertify.success('The restaurant has been successfully added.');
      let ref=document.getElementById('clear');
      ref?.click();

      this.formValue.reset();
      this.getRestaurants();
    },
    err=>{
      alertify.error('An error has occurred');
      console.log(err);
    })
  }

  getRestaurants(){
    this.api.getRestaurants().subscribe(res=>{
      this.restaurants = res;
    })
  }

  deleteRestaurant(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res=>{
      alertify.error(`${data.name} has been successfully deleted.`)
      this.getRestaurants();
    },err=>{
      alertify.error('An error has occurred');
    })
  }

  updateRestaurant(){
    this.restaurant.name=this.formValue.value.name;
    this.restaurant.email = this.formValue.value.email;
    this.restaurant.mobile=this.formValue.value.mobile;
    this.restaurant.address=this.formValue.value.address;
    this.restaurant.services=this.formValue.value.services;

    this.api.updateRestaurant(this.restaurant,this.restaurant.id).subscribe(res=>{
      alertify.success('Restaurant Records Updated Succesfully.');

      let ref=document.getElementById('clear');
      ref?.click();

      this.formValue.reset();
      this.getRestaurants();
    });
  }

  onEditRestaurant(data:any){
    this.showAdd=false;
    this.showBtn=true;
    this.restaurant.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }
  logOut(){
    this.api.isLoggedIn = false;
    this.router.navigate(["/login"]);
    alertify.success('You have successfully logged out.');
  }
}
