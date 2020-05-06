import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/API/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.scss']
})
export class ForgetpassComponent implements OnInit {
  email="";
  error="";
  
  constructor(private _auth: AuthService, public _router:Router) { }

  ngOnInit(): void {
  }

  OnSubmit()
  {

    this._auth.RequestForNewPassword(this.email).subscribe(
      data=>{  
        this.HandleError();
        console.log(data);
      });

  }

  HandleError()
  {
    if(localStorage.getItem('error') !=null)
    {   
        if( localStorage.getItem('error' ) == "[object ProgressEvent]"  )
        {
          this.error= "Server is not working right now";
          localStorage.removeItem('error');
        }
        else if(localStorage.getItem('error' ).length>100 || localStorage.getItem('error' ) == "[object ProgressEvent]"  )
        {
          localStorage.removeItem('error');
        }
        else{
      this.error= localStorage.getItem('error' );
      localStorage.removeItem('error');
        }
      }    
    else{
      this.error= null;      
      this._router.navigateByUrl('/login/forget');
    }
  }
}
