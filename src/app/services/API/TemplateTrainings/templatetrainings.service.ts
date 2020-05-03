import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpService } from '../http/http.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemplatetrainingsService {

  private trainingTemplatesUrl = "training";

   constructor(public _router:Router, private httpserv: HttpService, private http: HttpClient) { }
   GetTrainingTemplates()
   {
     const HeadersForProductAPI = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('token')
     })    
     return this.httpserv.requestCall(this.trainingTemplatesUrl,"Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
   }
 
   PostTrainingTemplates(data)
   {   
     const HeadersForProductAPI = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('token')
     })    
     return this.httpserv.requestCall(this.trainingTemplatesUrl,"Post",data,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
   }
 
   GetTrainingTemplateById(id)
   {
     const HeadersForProductAPI = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('token')
     })    
     return this.httpserv.requestCall(this.trainingTemplatesUrl +"/"+id,"Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
   }
 
   GetTrainingTemplatesIncludedPersonal()
   {
     const HeadersForProductAPI = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('token')
     })    
     return this.httpserv.requestCall(this.trainingTemplatesUrl+"/allTrainings","Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
   }
 
   GetTrainingsByType(type)
   {
     const HeadersForProductAPI = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('token')
     })    
     return this.httpserv.requestCall(this.trainingTemplatesUrl+"/TrainingsByType/"+ type,"Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
   }
 
   DeleteTrainingTemplate(id)
   {
     const HeadersForProductAPI = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('token')
     })    
     return this.httpserv.requestCall(this.trainingTemplatesUrl+"/"+ id,"Delete",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
   }
   UpdateTrainingTemplate(data)
   {   
     const HeadersForProductAPI = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('token')
     })    
     return this.httpserv.requestCall(this.trainingTemplatesUrl,"Put",data,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
   }

    
  private HandleError(errorResponse: HttpErrorResponse){
    if(errorResponse.status!=200){
      return "error";
    }  
  }
}
