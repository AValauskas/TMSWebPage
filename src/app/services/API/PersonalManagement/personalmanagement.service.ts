import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpService } from '../http/http.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonalmanagementService {

  private personalManagement = "personalmanagement";

  constructor(public _router:Router, private httpserv: HttpService, private http: HttpClient) { }

  GetPersonalInfo()
  { 
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalManagement+"/personal","Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }
  ChangePassword(data)
  { 
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalManagement+"/password","Patch",data,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }


//---------------------------------Competitions-------------------------

   AddNewCompetition(data)
  { 
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalManagement+"/newcompetition","Patch",data,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }

  GetRecords()
  { 
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalManagement+"/records","Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }

  GetRecordsOther(id)
  { 
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalManagement+"/records/"+id,"Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }

  GetCompetitions()
  { 
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalManagement+"/competitions","Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }
  GetOtherCompetitions(id)
  { 
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalManagement+"/competitions/"+id,"Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }
  GetAthletesWhichStillFree(date)
  { 
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalManagement+"/athleteList/"+date,"Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }


  //----------------------------INVITATIONS----------------------------
  GetInvitations()
  { 
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalManagement+"/invitations","Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }

  AcceptInvite(data)
  { 
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalManagement+"/AcceptInvite","Patch",data,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }

  DeclineInvitation(data)
  { 
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalManagement+"/DeclineInvite","Patch",data,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }

  SendInvite(data)
  { 
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalManagement+"/invite","Patch",data,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }
  
  GetPersonalCoach()
  {
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalManagement+"/personalcoach/","Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }


  GetUserFriends()
  {
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalManagement+"/friends/","Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }


  GetAthletesByCoach()
  {
    const HeadersForProductAPI = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })    
    return this.httpserv.requestCall(this.personalManagement+"/coachAthletes/","Get",null,HeadersForProductAPI).pipe(catchError(this.HandleError)); 
  }
  private HandleError(errorResponse: HttpErrorResponse){
    if(errorResponse.status!=200){
      return "error";
    }  
  }



}
