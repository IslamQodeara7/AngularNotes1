import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as jq from "jquery";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegistrationForm = new FormGroup({
    first_name: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]{4,10}$/)]),
    last_name: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]{4,10}$/)]),
    email: new FormControl(null, [Validators.required,
    Validators.pattern(/^(?=.*)[a-zA-Z]{5,20}[0-9]{0,5}@[a-zA-Z]{4,8}\.[a-zA-Z]{2,5}$/)]),
    password: new FormControl(null, [Validators.required,
    Validators.pattern(/^(?=.*[a-zA-Z]{5,8})([a-zA-Z0-9 !@#$%^&*]{8,15})$/)]),
    age: new FormControl(null, [Validators.required,
    Validators.max(80), Validators.min(20)])

  });
  
   
message:string='';
isError:boolean=false;
  constructor(private auth:AuthenticationService) {
    
   }
  getRegForm(formValue: object) {
    this.auth.register(formValue).subscribe((res)=>{
      
      if(res.error){
      this.message=res.error.message;
      
      }
      else{
        this.message=res.message
      }
      
      
      
    })

  }
  ngOnInit(): void {


  }

}
