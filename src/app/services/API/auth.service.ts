import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenParams } from '../../Components/userBegin/login/TokenParams';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpService } from '../API/http.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private _loginUrl = "https://localhost:44391/api/Auth/Login";
  private _loginUrl = "Auth/Login";
  private _registerUrl = "Auth/Register";
  private forgotPassUrl = "Auth/resetpassword";
  private _auth="Auth/"


  constructor(public _router:Router, private httpserv: HttpService) { }

  loginUser(data):Observable<TokenParams>
  {
    console.log(data);
   return this.httpserv.requestCall(this._auth+"Login","Post",data,null).pipe(catchError(this.HandleError));   
  }

  registerUser(data)
  {
    console.log(data);
    return this.httpserv.requestCall(this._auth+"Register","Post",data,null).pipe(catchError(this.HandleError)); 
   // let header = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    //return this.http.post<any>(this._registerUtl, data)
          
  }
  RequestForNewPassword(email)
  {
    console.log(email);
   return this.httpserv.requestCall(this._auth+"resetpassword/"+email,"Post",null,null).pipe(catchError(this.HandleError));   
  }

  ConfirmReset(id)
  {
    console.log(id);
   return this.httpserv.requestCall(this._auth+"confirmreset/"+id,"Patch",null,null).pipe(catchError(this.HandleError));   
  }

  CompleteRegister(id)
  {

   return this.httpserv.requestCall(this._auth+"confirm/"+id,"Patch",null,null).pipe(catchError(this.HandleError));   
  }
  logoutUser()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem('user');
    localStorage.removeItem('expire')         
    this._router.navigate([decodeURI("login")]);       
  }
    
  private HandleError(errorResponse: HttpErrorResponse){
    if(errorResponse.status!=200){
      return "error";
    }  
  }
}
