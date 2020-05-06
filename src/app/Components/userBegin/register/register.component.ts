import { Component, OnInit } from '@angular/core';
import { RegisterForm } from './RegisterForm';
import { NgForm, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/API/auth.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper/helper.service';
import { Iuser } from 'src/app/Interfaces/IUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user= <Iuser>{};
  checkedAthlete=true;
  checkedCoach = false;
  role="Athlete";
  pw1:string;
  pw2:string;
  error:String;
  constructor(private _auth: AuthService, private helper:HelperService, public _router:Router) { }

  

  OnSubmit()
  {
    console.log(this.user);
    console.log(this.isAlphaNum(this.pw1));
    if(this.pw1!=this.pw2)
    {
      console.log(this.pw1);
      console.log(this.pw2);
      this.error="Passwords are not the same";
    }
    else if(!this.isAlphaNum(this.pw1)){
      this.error="Password must contain numbers and letters";
    }
    else{
      this.user.password = this.pw1;
    this._auth.registerUser(this.user).subscribe(
      data=>{  
        this.HandleError();
        if(this.error == null) 
        {  
        this._router.navigate([decodeURI("login/registered")]);  
        }            
      }    
    )  
  }
  }

  ngOnInit(): void {
    this.user.role="Athlete";
  }

   isAlphaNum(s){ // this function tests it
   var p = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
    return p.test(s);
    }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPass').value;
  
    return pass === confirmPass ? null : { notSame: true }     
  }

    

  HandleError()
  {
    console.log("aaten");
    if(localStorage.getItem('error') !=null)
    {
      console.log("a y");
      this.error= localStorage.getItem('error' );
      localStorage.removeItem('error');
    }
    else{
      this.error= null;      
    }
  }
}
