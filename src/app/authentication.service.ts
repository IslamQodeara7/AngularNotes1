import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  decodedData:string='';
  userLogin= new BehaviorSubject(null);
  constructor(private _httpClient:HttpClient,private router:Router) { 
   if(localStorage.getItem('userToken')!=null){
    this.decodeToken();
    
   } 
  }

  decodeToken(){
  this.decodedData=JSON.stringify(localStorage.getItem('userToken'));
  this.userLogin.next(jwtDecode(this.decodedData));
  }
  register(form:object):Observable<any>{
    return this._httpClient.post("https://movies-api.routemisr.com/signup",form);
  }

  login(form:object):Observable<any>{
    return this._httpClient.post("https://movies-api.routemisr.com/signin",form);
  }

  logout(){
    localStorage.removeItem('userToken');
    this.userLogin.next(null);
    this.router.navigate(['/login']);
  }
}
