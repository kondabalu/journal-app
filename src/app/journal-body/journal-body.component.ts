import { Component, OnInit } from '@angular/core';
import { JournalBodyService } from '../service/journal-body.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

interface EntriesDAO{
  _id: string,
  dateOfEntry:Date,
  title:string,
  entry:string
}
@Component({
  selector: 'app-journal-body',
  templateUrl: './journal-body.component.html',
  styleUrls: ['./journal-body.component.css']
})
export class JournalBodyComponent implements OnInit {

  entries: EntriesDAO[] =[];
  createBool: boolean = false;
  editBool: boolean = false;
  deleteBool: boolean = false;
  constructor(private journalService:JournalBodyService, private router:Router) { }

  ngOnInit(): void {
    this.getEntrires();
  }

  onEditClick(){
    this.editBool = !this.editBool;
  }

  onDeleteClick(){
    this.deleteBool = !this.deleteBool;
  }

  onCreateClick(){
    this.createBool = !this.createBool;
  }

  onCreate(f:NgForm){
    const entry: EntriesDAO =JSON.parse(JSON.stringify({
      dateOfEntry: Date.now(),
      title: f.value.title,
      entry: f.value.entry
    }));
    this.journalService.addEntry(entry).subscribe((response)=>{
      console.log(response);
      this.getEntrires();
      this.onCreateClick();
    },error =>{
      console.log(error);
    });
  }

  onEdit(entry:any){
    this.journalService.editEntry(entry).subscribe((response)=>{
      console.log(response);
      this.getEntrires();
      this.onEditClick();
    },error =>{
      console.log(error);
    });
  }

  onDelete(entry:any){
    this.journalService.deleteEntry(entry).subscribe((response)=>{
      console.log(response);
      this.getEntrires();
      this.onDeleteClick();
    },error =>{
      console.log(error);
    });
  }


  getEntrires(){
    this.journalService.getAllEntries().subscribe((response)=>{
      this.entries = response.posts;
      console.log(response.message);
    },error=>{
      console.log(error);
    })
  }

  onLogout(){
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.router.navigate(['./']);
  }




}
