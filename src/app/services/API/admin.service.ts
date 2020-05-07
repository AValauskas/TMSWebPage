import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private Admin = "admin";

  constructor(public _router:Router, private httpserv: HttpService, private http: HttpClient) { }

  GetUsers()
  { 
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.Admin,"Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }

  
  InsertAdmin(user)
  { 
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.Admin,"Post",user,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }

  
  DeleteUser(id)
  { 
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.Admin+"/"+id,"Delete",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }
  private HandleError(errorResponse: HttpErrorResponse){
    if(errorResponse.status!=200){
      return "error";
    }  
  }

}
