import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JournalBodyService {

  constructor(private http: HttpClient, private router: Router) { }

  getAllEntries(){
    const id = localStorage.getItem('username');
    const headers = new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem('token'));
    return this.http.get<any>(`http://localhost:3000/api/journal/entries/${id}`);
  }

  addEntry(entry:any){
    const id = localStorage.getItem('username');
    const headers = new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem('token'));
    return this.http.put<any>(`http://localhost:3000/api/journal/entry/${id}`,entry);
  }

  deleteEntry(entry:any){
    const id = localStorage.getItem('username');
    const headers = new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem('token'));
    return this.http.post<any>(`http://localhost:3000/api/journal/delete-entry/${id}`,entry);
  }

  editEntry(entry:any){
    const id = localStorage.getItem('username');
    const headers = new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem('token'));
    return this.http.put<any>(`http://localhost:3000/api/journal/edit-entry/${id}`,entry);
  }



}
