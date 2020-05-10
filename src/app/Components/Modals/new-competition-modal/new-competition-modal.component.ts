import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ICompetition } from 'src/app/Interfaces/ICompetition';
import { Router } from '@angular/router';
import { ITime } from 'src/app/Interfaces/ITime';
import { PersonalmanagementService } from 'src/app/services/API/personalmanagement.service';
declare var $ :any;

@Component({
  selector: 'app-new-competition-modal',
  templateUrl: './new-competition-modal.component.html',
  styleUrls: ['./new-competition-modal.component.scss']
})
export class NewCompetitionModalComponent implements OnInit {
  
  constructor(private _httpManagement: PersonalmanagementService, public _router:Router) { }

  competition:ICompetition=<ICompetition>{};
  time:ITime=<ITime>{};
  @Output("FillForms") parentFun: EventEmitter<any> = new EventEmitter();
  selectedDistance="";
  negative =false;


  ngOnInit(): void {
    this.competition.place="Inside";
  }


  OnSubmit()
  {
    console.log(this.time.min);
    console.log(this.time.sec);
    if(this.time.min<0||this.time.sec<0||this.time.sec>60)
    {

    }
    if(this.time.min!=null)    
    {
    this.competition.time=this.time.min*60+this.time.sec;
    }
    else{
      this.competition.time=this.time.sec;
    }
    if(this.time.min<0||this.time.sec<0||this.time.sec>59)
    {
      this.negative= true;
    }
    else{
      this.negative= false;
      this.competition.distance=+this.selectedDistance;
    console.log(this.competition);
    this.competition.distance= Number(this.competition.distance);
    this._httpManagement.AddNewCompetition(this.competition).subscribe(data=>{
      this.parentFun.emit();
      $('#myModal').modal("hide");
      this.competition=<ICompetition>{};
      this.time=<ITime>{};
      });
    }
  }



}
