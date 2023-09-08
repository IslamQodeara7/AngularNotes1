import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
user:any=null;
isLogin:boolean=false;
  constructor(private auth:AuthenticationService) { }

  ngOnInit(): void {
this.auth.userLogin.subscribe(()=>{
  this.user=this.auth.userLogin.getValue()
  if(this.auth.userLogin.getValue()){
    this.isLogin=true;
  }
  else{
    this.isLogin=false;
  }
  
})

  }
logout(){
  this.auth.logout();
}
}
