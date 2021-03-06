import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = "https://tmsback-end.herokuapp.com/api/";
  //private apiUrl = "https://localhost:44391/api/";
  constructor(private http: HttpClient, public _router:Router) { }

  requestCall(api: string,method:string, data?:any, headerHttp?: HttpHeaders)
  {
    let response;
    switch(method){
        case "Get":
            response=this.http.get<any>(this.apiUrl+api, {headers: headerHttp})
            .pipe(catchError(this.HandleError));
            break;
        case "Post":
            response = this.http.post<any>(this.apiUrl+api, data, {headers: headerHttp})
            .pipe(catchError(this.HandleError));   
            break;
        case "Put":
            response = this.http.put<any>(this.apiUrl+api, data, {headers: headerHttp})
            .pipe(catchError(this.HandleError));   
            break;
        case "Patch":
            response = this.http.patch<any>(this.apiUrl+api, data, {headers: headerHttp})
            .pipe(catchError(this.HandleError));   
            break;
        case "Delete":
            response = this.http.delete<any>(this.apiUrl+api, {headers: headerHttp})
           .pipe(catchError(this.HandleError));   
            break;
        default:
          break;        
    }
    return response;
  }
 
 

  private HandleError(errorResponse: HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent ){
      console.error("an error",errorResponse.error.message)
      
    }else{
      localStorage.setItem('error', errorResponse.error )
      console.log(errorResponse.error.message);
      console.log(errorResponse.error);
      console.log(errorResponse);
    return "b";
    }
   
  }

}
