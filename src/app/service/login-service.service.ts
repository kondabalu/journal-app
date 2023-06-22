import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  login(inputFields:{username:string,password:string}){
    return this.http.post<any>(`http://localhost:3000/api/journal/login`,inputFields);
  }
  register(inputFields:{username:string,password:string}){
    return this.http.post<any>(`http://localhost:3000/api/journal/register`,inputFields);
  }
  forgot(inputFields:{username:string,password:string}){
    return this.http.post<any>(`http://localhost:3000/api/journal/forgot`,inputFields);
  }
}
