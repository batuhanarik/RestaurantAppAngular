import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
declare let alertify;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  constructor(private apiService:ApiService,private formBuilder : FormBuilder,private _http: HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    });
  }

  logIn(){ 
    this.apiService.logIn().subscribe(res => {
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        this.apiService.isLoggedIn = true;
        alertify.success('Login Successful');
        this.loginForm.reset();
        this.router.navigate(['restaurant']);
      }else{
        alertify.error('User Not Found!!');
      }
    },err=>{
      alertify.error('An error has occurred ' + err);
    }
    )
  }

}
