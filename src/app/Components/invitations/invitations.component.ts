import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalmanagementService } from 'src/app/services/API/PersonalManagement/personalmanagement.service';

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
  inviter:IInviter = <any>{};
  constructor(private _httpManagement: PersonalmanagementService, public _router:Router) { }

  ngOnInit(): void {
    this._httpManagement.GetInvitations().subscribe(data=>{
      this.invitations = data
      if( Object.keys(this.invitations).length== 0)
      {
        this.isAnyInvite= false;
      }else{
        this.isAnyInvite= true;
      }
    console.log(data);
    })
  }
 
  AcceptInvite(invaiterId:string)
  {
    this.inviter.Id =invaiterId;
    console.log(invaiterId);
    this._httpManagement.AcceptInvite(this.inviter).subscribe(data=>{      
      this.invitations = data;    

        console.log(this.invitations);  
        this.parentSuccess.emit("You have accepted invitation");
        localStorage.removeItem("error");
        this.inviter.Id="";   
      
    })   
    
  }

  DeclineInvite(invaiterId:string)
  {
    console.log(invaiterId);
    this.inviter.Id =invaiterId;
    console.log(invaiterId);
    this._httpManagement.DeclineInvitation(this.inviter).subscribe(data=>{      
      this.invitations = data;
        console.log(this.invitations); 
        this.parentSuccess.emit("You have declined invitation");
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
    console.log( this.inviter);
    this._httpManagement.SendInvite(this.inviter).subscribe(data=>{    
      if(localStorage.getItem("error")==null)
      {  
        this.parentSuccess.emit("Invitation sent succesfully");
        this.success= "Invitation sent succesfully"
        this.inviter.Id="";    
        localStorage.removeItem("error");
      }
      else
      {
        this.error = localStorage.getItem("error");
        this.parentFail.emit(localStorage.getItem("error"));
        localStorage.removeItem("error");
      }
    })
  
  }

}
