import { Component, OnInit } from '@angular/core';
import { TokenParams } from './TokenParams';
import { AuthService } from 'src/app/services/API/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error:String;
  loginUserData = <any>{};
  tokenParam: TokenParams;
  message="";
  constructor(private _auth: AuthService,private helper:HelperService, public _router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {    
    
        if (!this.helper.CheckIfTokenIsExpired())
        {this._router.navigate([decodeURI("home")]);}
        else
        {this.helper.UnsetStorage();}   
        
        if(this.route.snapshot.paramMap.get("message") !=null)
        {
          this.message = this.route.snapshot.paramMap.get("message")     
          if(this.message=="forget")
          {
            this.message="email exist, check email if you want to complete of  password changing";
          }
          else if(this.message=="registered")
          {
            this.message="You have succesfully registered, you only need to confirm your email";
          }
          else if(this.message.includes("register"))
          {
            var id =  this.message.replace("register", "");
            this._auth.CompleteRegister(id).subscribe(
              data=>{  });
            this.message="You have succesfully registered!!";
          }
          else if(this.message.includes("reset"))
          {
            var id =  this.message.replace("reset", "");
            this._auth.ConfirmReset(id).subscribe(
              data=>{  });
            this.message="You have confirmed password update, we sent a new password to you";
          }

        }     
         
        console.log(this.message);
  }

  OnSubmit()
  {
    this.message=null;
    this._auth.loginUser(this.loginUserData).subscribe(
      data=>{  
        this.HandleError();
        if(this.error == null) 
        {
        console.log(data);
        this.helper.ProcessToken(data.Token)        
        this._router.navigate([decodeURI("home")]);  
        }            
      }     
    )  
     
  }

  HandleError()
  {
    
    if(localStorage.getItem('error') !=null)
    {
      console.log(localStorage.getItem('error' ).substring(18,23));
      if(localStorage.getItem('error' ).substring(18,23)=="email")
      {
        this.error= "you should confirm your email first";
        localStorage.removeItem('error');
      }
      else{
       
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
    }
    else{
      this.error= null;      
    }
  }
  
}
