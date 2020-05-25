import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalmanagementService } from 'src/app/services/API/personalmanagement.service';
import { TranslateService } from '@ngx-translate/core';

interface IInviter{
  Id:string;
}

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss']
})
export class InvitationsComponent implements OnInit {

  @Output("SendSuccesMessage") parentSuccess: EventEmitter<any> = new EventEmitter();
  @Output("SendFailMessage") parentFail: EventEmitter<any> = new EventEmitter();

  invitations: Object;
  isAnyInvite=false;
  error:string;
  success:string;
  message:string;
  inviter:IInviter = <any>{};
  constructor(private _httpManagement: PersonalmanagementService, public _router:Router, public translate:TranslateService) { }

  ngOnInit(): void {
    this._httpManagement.GetInvitations().subscribe(data=>{
      this.invitations = data
      if( Object.keys(this.invitations).length== 0)
      {
        this.isAnyInvite= false;
      }else{
        this.isAnyInvite= true;
      }
    })
  }
 
  AcceptInvite(invaiterId:string)
  {
    this.inviter.Id =invaiterId;
    this._httpManagement.AcceptInvite(this.inviter).subscribe(data=>{      
      this.invitations = data;    
        this.translate.get('MESSAGES.INVITEACCEPT').subscribe((text:string) => {this.message=text});  
        this.parentSuccess.emit(this.message);
        localStorage.removeItem("error");
        this.inviter.Id="";   
      
    })   
    
  }

  DeclineInvite(invaiterId:string)
  {
    this.inviter.Id =invaiterId;
    this._httpManagement.DeclineInvitation(this.inviter).subscribe(data=>{      
      this.invitations = data;
        this.translate.get('MESSAGES.DECLINEINVITE').subscribe((text:string) => {this.message=text});  
        this.parentSuccess.emit(this.message);
        localStorage.removeItem("error");
        if(localStorage.getItem("error")==null)
      {    
        invaiterId=null;  
        this.inviter.Id="";       
      }   
    })   
    
  }

  SendInvite()
  {
    this.error=null;
    this._httpManagement.SendInvite(this.inviter).subscribe(data=>{    
      if(localStorage.getItem("error")==null)
      {  
        this.translate.get('MESSAGES.INVITESUCCESSSENT').subscribe((text:string) => {this.message=text});  
        this.parentSuccess.emit(this.message);
        this.success= this.message;
        this.inviter.Id="";    
        localStorage.removeItem("error");
      }
      else
      {
        this.error = localStorage.getItem("error");
        localStorage.removeItem("error");
      }
    })
  
  }

}
