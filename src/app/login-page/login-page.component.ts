import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../service/login-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  
  loginCondition: boolean = true;
  signUpCondition: boolean = false;
  forgotCondition: boolean = false;
  matchCondition: boolean = false;


  constructor(private authService: LoginServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(){
    this.loginCondition = true;
    this.forgotCondition = false;
    this.signUpCondition = false;
  }

  onForgot(){
    this.loginCondition = false;
    this.forgotCondition = true;
    this.signUpCondition = false;
    
  }

  onSignup(){
    this.loginCondition = false;
    this.forgotCondition = false;
    this.signUpCondition = true;
  }

  login(username : string, password: string){
    this.authService.login({username,password}).subscribe((response)=>{
      this.storeUser(username,response.token);
      console.log(response.message);
      this.router.navigate(['./journal'])
    },error=>{
      console.log(error);
    });
  }
  onSubmit(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    this.login(form.value.username,form.value.password);
    form.reset();
  }

  onSubmitForgot(form:NgForm){
    const username = form.value.userName;
    const password = form.value.password;
    const confirmPassword= form.value.confirmPassword;
    if(password.trim()===confirmPassword.trim()){
      this.authService.forgot({username,password}).subscribe((response)=>{
        this.login(username,password);
        console.log(response.message);
      },error=>{
        console.log(error);
      })
    }else{
      this.matchCondition = true;
    }
  }
  onSubmitRegister(form:NgForm){
    const username = form.value.userName;
    const password = form.value.password;
    const confirmPassword= form.value.confirmPassword;
    if(password.trim()===confirmPassword.trim()){
      this.authService.register({username,password}).subscribe((response)=>{
        this.login(username,password);
        console.log(response.message);
      },error=>{
        console.log(error);
      })
    }else{
      this.matchCondition = true;
    }
  }

  storeUser(username:string,token:string){
    localStorage.setItem('username', username);
    localStorage.setItem('token',token);
  }

}
