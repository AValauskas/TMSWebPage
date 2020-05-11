import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpService } from  '../API/http.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonaltrainingsService {

  private personalTraining = "personaltraining";

  constructor(public _router:Router, private httpserv: HttpService, private http: HttpClient) { }
  GetPersonalTrainings()
  {
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalTraining+"/athlete","Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }
  GetAthletesWhichStillFree(date)
  { 
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalTraining+"/athleteList/"+date,"Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }

  GetPersonalTrainingByDate(data)
  {
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalTraining+"/date/"+data,"Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }

  GetPersonalTrainingById(id)
  {
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalTraining+"/"+id,"Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }
  GetPersonalTrainingsBusy()
  {
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalTraining+"/countByBusy","Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }

  InsertPersonalTraining(data)
  {
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalTraining,"Post",data,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }

  DeletePersonalTraining(id)
  {
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalTraining+"/"+ id,"Delete",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }

  
  UpdatePersonalTrainingResults(record, id)
  {
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalTraining+"/results/"+ id,"Patch",record,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }

 

  GetAllCoachAssignedTrainings()
  {
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalTraining+"/coach","Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }

  GetAllCoachAssignedTrainingsByDate(date)
  {
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalTraining+"/coach/"+date,"Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }


  private HandleError(errorResponse: HttpErrorResponse){
    if(errorResponse.status!=200){
      return "error";
    }  
  }
}
