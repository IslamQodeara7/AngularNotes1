import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import  jwtDecode  from 'jwt-decode';
import { NotesService } from './../notes.service';
import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    
   
    this.gettingNotes();


    
        
  } 
  constructor(private auth:AuthenticationService,private noteServ:NotesService) { }
  appeare:boolean=false;
  add:boolean=false;
update:boolean=false;
userObj=this.auth.userLogin.getValue();

getter:object={
  userID:this.userObj?.['_id'],
  token:JSON.parse(this.auth.decodedData),
 
}
adder={
  title:null,
  desc:null,
  citizenID:this.userObj?.['_id'],
  token:JSON.parse(this.auth.decodedData),
}

a:any=null;
b:any=null;
emptyNote:boolean=false;
successNote:boolean=false;
notesArr:any[]=[];
gettingNotes(): void{
  this.noteServ.getUserNotes(this.getter).subscribe((res)=>{
  if(res.Notes){
    this.notesArr=res.Notes;
   this.appeare=true
    
 
  }
  else{
    this.notesArr=[{}];
    this.appeare=false
  }
 
  
  })
    
    
}
addingNotes(){

  if($(".title").val()!=''&&$(".desc").val()!=''){
    this.emptyNote=false;
    this.successNote=true;
  this.a=$(".title").val();
  this.b=$(".desc").val();
  this.adder.title=this.a;
  this.adder.desc=this.b;
  $(".title").val('');
  $(".desc").val('');
  this.noteServ.addNote(this.adder).subscribe((res)=>{
    console.log(res);
    this.gettingNotes(); 
    this.appeare=true; 
  })
  
}
else{
  this.emptyNote=true;
  this.successNote=false;
}

}
deleter:any={
 body:{
  token:'',
  NoteID:'',
 }

}
deletingNotes(i: number){

this.deleter.body.NoteID=this.notesArr[i]._id;
this.deleter.body.token=JSON.parse(this.auth.decodedData);
console.log(this.deleter);

this.noteServ.deleteNote(this.deleter).subscribe((res)=>{
  console.log(res);
  this.gettingNotes();
  
})

}
updateIndex:number=0;
updatingNotes1(i:number){
$('.title').val(this.notesArr[i].title);
$('.desc').val(this.notesArr[i].desc);
this.updateIndex=i;
}

updater:any={
  NoteID:'',
  token:'',
  title:'',
  desc:'',
}
updatingNotes2(){
  this.emptyNote=false;
  this.successNote=false;
  if($(".title").val()!=''&&$(".desc").val()!=''){
    this.emptyNote=false;
    this.successNote=true;
this.updater.NoteID=this.notesArr[this.updateIndex]._id;
this.updater.token=JSON.parse( this.auth.decodedData);
this.updater.title=$('.title').val();
this.updater.desc=$('.desc').val();
console.log(this.updater);

this.noteServ.updateNote(this.updater).subscribe((res)=>{
  console.log(res);
  this.gettingNotes();  
})
$(".title").val('');
$(".desc").val('');
  }
  else{
    this.emptyNote=true;
    this.successNote=false;
  }
}



 

}
