declare var $ :any;
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ISet } from '../../../Interfaces/ISet';
import { IPersonalTraining } from '../../../Interfaces/IPersonalTraining';
import { ITrainingTemplate } from '../../../Interfaces/ITrainingTemplate';
import { IAthleteForm } from '../../../Interfaces/IAthleteForm';
import { ISetToDisplay } from 'src/app/Interfaces/ISetToDisplay';
import { PersonaltrainingsService } from 'src/app/services/API/personaltrainings.service';
import { ISetFull } from 'src/app/Interfaces/ISetFull';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-personal-training-modal',
  templateUrl: './personal-training-modal.component.html',
  styleUrls: ['./personal-training-modal.component.scss']
})
export class PersonalTrainingModalComponent implements OnInit {

  @Input() personalTraining: IPersonalTraining;
  @Input() toDo :ITrainingTemplate;
  @Input() exist :boolean;
  @Output("TurnOnSuccesMessage") parentFun: EventEmitter<any> = new EventEmitter();
  
  athleteForm:IAthleteForm = new IAthleteForm()
  trainingsToAdd: ISet[] = [];
  trainingsToAddFull: ISetFull[] = [];
  canFillForm = false;
  max =0;
  setsToDisplay:ISetToDisplay[]=[]
  negative =false;
  message="";
  
  constructor(private _httpPersonalTrain: PersonaltrainingsService, public _router:Router, public translate:TranslateService) { 
  
  }

  ngOnInit(): void {
   
  }


  ngOnChanges() {
  if(typeof this.personalTraining !== 'undefined'){
    if(this.personalTraining!=null)
    {
      this.trainingsToAddFull=[];
      this.trainingsToAdd =this.personalTraining.results
      this.trainingsToAdd.forEach(element => {

        var paceMin=Math.trunc(element.pace/60);
        var paceSec=element.pace-paceMin*60;
        var restMin=Math.trunc(element.rest/60);
        var restSec=element.rest-restMin*60;
        var trainObject = {distance:element.distance,paceMin:paceMin,paceSec:paceSec, restMin:restMin,restSec:restSec};      
        this.trainingsToAddFull.push(trainObject);   
      })
    }    
  }
    if(this.exist){      
      var dateTraining=new Date(this.personalTraining.day)
    if(dateTraining.getTime() <= Date.now() )
    {
      this.canFillForm = true;
      if(this.toDo!=null)
      {
        if(this.toDo.sets.length==0)
        {
          this.max =this.toDo.repeats;
        }
        else{
        this.max = this.toDo.repeats*this.toDo.sets.length;
        if(this.setsToDisplay.length>0) 
        this.setsToDisplay=[];
        this.FormSetsToDisplay();
        }
      }      
    }
    else{
      this.canFillForm = false;
      this.setsToDisplay=[];
    }
  }
  }

  FormSetsToDisplay()
  {
      this.toDo.sets.forEach(element => {
        
        let set =  {} as ISetToDisplay;
        set.distane =element.distance;

        var paceMinNumb =Math.trunc(element.pace/60) ;
        var restMinNumb =Math.trunc(element.rest/60);

        if(paceMinNumb>=1)
        {
         var paceMin = paceMinNumb.toString()+"min "
        }
        else
        {
          paceMin="";
        }

        if(restMinNumb>=1)
        {
         var restMin = restMinNumb.toString()+"min "
        }
        else
        {
          restMin="";
        }

        set.rest=restMin+(element.rest - restMinNumb*60).toString()+"s"
        set.runTime=paceMin+(element.pace - paceMinNumb*60).toString()+"s"
        this.negative= false;
        this.setsToDisplay.push(set);
      });
  }

  OnClick()
  {
    var nullObject = {distance:null,paceMin:null,paceSec:null, restMin:null,restSec:null};      
    this.negative=false;
    if(this.trainingsToAddFull.length<this.max)
    {
      this.trainingsToAddFull.push(nullObject);    
    }
    else{
      this.negative=true;
      this.translate.get('MESSAGES.ACCORDINGTEMPLATE').subscribe((text:string) => {this.message=text});  
     // this.message ="According to template you can only add this count of repeats"        
    }    
  }

  OnDelete(index:number)
  {        
    this.negative=false;
     this.message =""
     this.trainingsToAddFull.splice(index, 1);
  }

  OnSubmit()
  {
    this.negative=false;
    this.message="";
    this.trainingsToAdd=[];
    this.trainingsToAddFull.forEach(element => {
      if (element.distance<0||element.paceMin<0||element.restMin<0||element.paceSec<0||element.restSec<0||element.paceSec>59||element.restSec>59)
      {
        this.negative= true;  
        this.translate.get('COMPETITIONS.ERRORSEC').subscribe((text:string) => {this.message=text});   
     //   this.message ="all training datas must be positive and seconds less than 60 "       
      } 
      var pace =element.paceMin*60+element.paceSec
      var paceString = pace.toFixed(2);
      var roundedPace = Number(paceString);

      var rest =element.restMin*60+element.restSec
      var restString = rest.toFixed(2);
      var roundedRest = Number(restString);

      var train = {distance:element.distance,pace:roundedPace, rest:roundedRest};
      this.trainingsToAdd.push(train);    
      
  })
  if(!this.negative)
  {
    this.athleteForm.report=this.personalTraining.athleteReport;
    this.athleteForm.results = this.trainingsToAdd;
    this._httpPersonalTrain.UpdatePersonalTrainingResults(this.athleteForm, this.personalTraining.id).subscribe(data=>{      
    })
    this.parentFun.emit();
    $('#myModal').modal("hide");
  } 
  }

 

  
  
}
