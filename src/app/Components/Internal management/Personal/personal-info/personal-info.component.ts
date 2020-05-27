import { Component, OnInit } from '@angular/core';
import { Iuser } from 'src/app/Interfaces/IUser';
import { Router, NavigationStart } from '@angular/router';
import { PersonalmanagementService } from 'src/app/services/API/personalmanagement.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  user:Iuser = new Iuser();
  role:string;
  firstPass: string;
  secondPass: string;
  coach:Iuser = new Iuser();
  friends:Iuser[]=[];
  athletes:Iuser[]=[];
  CoachClicked= false;
  friendsClicked= false;
  athletesClicked= false;
  successMessage= false;
  failMessage= false;
  message:string;

  constructor(private _httpManagement: PersonalmanagementService, public _router:Router,public translate:TranslateService) { }

  ngOnInit(): void {                
    if(localStorage.getItem('role')==null)
    {
      this._router.navigateByUrl('/login');
    }   
    localStorage.removeItem("friend");
    localStorage.removeItem("friendId");   
    localStorage.removeItem("visit");   

    this.role= localStorage.getItem('role')
    this._httpManagement.GetPersonalInfo().subscribe(data=>{
      this.user= data;
    })
    if (this.role=="Athlete"){   
      this._httpManagement.GetPersonalCoach().subscribe(data=>{
        this.coach= data;
      });
      this._httpManagement.GetUserFriends().subscribe(data=>{
        this.friends= data;
      });
    }
    if (this.role=="Coach"){   
      this._httpManagement.GetAthletesByCoach().subscribe(data=>{
        this.athletes= data;
      });
    }

  }

  ChangePassword()
  {
    if(this.firstPass!=this.secondPass)
    {
      var message;
      this.translate.get('MESSAGES.DIFFERENTPASS').subscribe((text:string) => {message=text});  
      this.FailMessage(message);
    }
    else if(!this.isAlphaNum(this.firstPass)){
      var message;
      this.translate.get('MESSAGES.VALIDATEFAILED').subscribe((text:string) => {message=text});   
      this.FailMessage("Password must contain numbers and letters");
    }
    else
    {
      this.user.password=this.firstPass;
      this._httpManagement.ChangePassword(this.user).subscribe(data=>{        
        this.firstPass="";
        this.secondPass="";
        var message;
        this.translate.get('MESSAGES.PASSWORDCHANGED').subscribe((text:string) => {message=text});   
        this.SuccesfullyMessage(message)
      })
    }
  
  }

  ChangeCoachSize()
  {
    if( this.CoachClicked)
    {
      this.CoachClicked= false;
    }
    else{
      this.CoachClicked= true;
    }
  }

  ChangeFriendsSize()
  {
    if( this.friendsClicked)
    {
      this.friendsClicked= false;
    }
    else{
      this.friendsClicked= true;
    }
  }

  ChangeAthleteSize()
  {
    if( this.athletesClicked)
    {
      this.athletesClicked= false;
    }
    else{
      this.athletesClicked= true;
    }
  }

  CheckFriend(other:Iuser)
  {
   localStorage.setItem("friendId", other.idPerson);
   localStorage.setItem("friend", other.name+ " " + other.surname);
   this._router.navigateByUrl('/personal');
  }


  async SuccesfullyMessage(message)
  {
    this.successMessage = true;
    this.message = message;
    await this.delay(3000);
    this.successMessage = false;
    this.message="";
  }

  isAlphaNum(s){ // this function tests it
    var p = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
     return p.test(s);
     }
     

  async FailMessage(message)
  {
    this.failMessage = true;
    this.message = message;
    await this.delay(3000);
    this.failMessage = false;
    this.message="";
  }
 delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}
