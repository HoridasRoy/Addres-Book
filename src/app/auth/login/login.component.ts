import { Component } from "@angular/core";
import {NgForm } from '@angular/forms';
import { AuthService } from "../auth.service";
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.componet.css']
})
export class LoginComponent {
  isLoading = false;

  constructor (private authService: AuthService){}
  onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
    console.log(form.value.email);
    console.log(form.value.password);
    this.authService.login(form.value.email, form.value.password);
  }
}


