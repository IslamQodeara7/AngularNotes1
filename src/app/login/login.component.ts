import { AuthenticationService } from './../authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm = new FormGroup({
    email: new FormControl(null, [Validators.required,
    Validators.pattern(/^(?=.*)[a-zA-Z]{5,20}[0-9]{0,5}@[a-zA-Z]{4,8}\.[a-zA-Z]{2,5}$/)]),
    password: new FormControl(null, [Validators.required,
    Validators.pattern(/^(?=.*[a-zA-Z]{5,8})([a-zA-Z0-9 !@#$%^&*]{8,15})$/)])

  })
  loginError:string='';
  getLogForm(formValue:object){
     this.auth.login(formValue).subscribe((res)=>{
    if(res.message=='success'){
      this.router.navigate(['/home']);
      localStorage.setItem('userToken',res.token);
      this.auth.decodeToken();
    }
    else{
    this.loginError=res.message;
    
    }
      
     })
  }
  constructor(private auth:AuthenticationService,private router:Router) {

   }

  ngOnInit(): void {
  }

}
