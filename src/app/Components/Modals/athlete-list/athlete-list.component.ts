import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPersonalTraining } from 'src/app/Interfaces/IPersonalTraining';
import { Router } from '@angular/router';
import { ITrainingTemplate } from 'src/app/Interfaces/ITrainingTemplate';
import { ICoachAssignedTraining } from 'src/app/Interfaces/ICoachAssignedTraining';
import { ISet } from 'src/app/Interfaces/ISet';
import { IAthleteForm } from 'src/app/Interfaces/IAthleteForm';
import { ISetToDisplay } from 'src/app/Interfaces/ISetToDisplay';
import { TemplatetrainingsService } from 'src/app/services/API/templatetrainings.service';
import { PersonaltrainingsService } from 'src/app/services/API/personaltrainings.service';
import { ISetFull } from 'src/app/Interfaces/ISetFull';
import { TranslateService } from '@ngx-translate/core';
declare var $ :any;

@Component({
  selector: 'app-athlete-list',
  templateUrl: './athlete-list.component.html',
  styleUrls: ['./athlete-list.component.scss']
})
export class AthleteListComponent implements OnInit {
  @Input() dateClicked :string;
  @Input() AssignedTraining :ICoachAssignedTraining;
  @Output("SuccesfullyMadeByCoachMessage") parentFun: EventEmitter<any> = new EventEmitter();

  alreadyPast = false;
  max=0;
  athlete:string;

  toDo:ITrainingTemplate;
  personalTraining: IPersonalTraining;
  trainingsToAdd: ISet[] = [];
  trainingsToAddFull: ISetFull[] = [];
  athleteForm:IAthleteForm = new IAthleteForm();
  setsToDisplay:ISetToDisplay[]=[];
  negative =false;
  message="";
  
  constructor(private _httpPersonalTrain: PersonaltrainingsService,private _httpTemplate: TemplatetrainingsService,
    public _router:Router, public translate:TranslateService) { }

  ngOnInit(): void {
    console.log(this.AssignedTraining)
    console.log(this.AssignedTraining.personalTrainingId)
    console.log(this.AssignedTraining.trainingTemplateId)
    console.log(this.AssignedTraining.athlete)
    
  }


  ngOnChanges() {
    this.toDo=<any>{};
    this.personalTraining=<any>{};
    this.trainingsToAdd=[];
    this.athleteForm=<any>{};
    this.setsToDisplay=[];
    var dateTraining=new Date(this.dateClicked);

    if(dateTraining.getTime() <= Date.now() )    
    {
      this.alreadyPast=true;
    }
    else{
      this.alreadyPast=false;
    }
    this.trainingsToAdd = [];
    this.DisplayTrain()
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
        
        this.setsToDisplay.push(set);
      });
console.log(this.setsToDisplay);
  }


  DisplayTrain()
  {
    this.athlete = this.AssignedTraining.athlete;
    console.log( this.dateClicked);
    console.log( this.AssignedTraining.personalTrainingId);
    this._httpTemplate.GetTrainingTemplateById( this.AssignedTraining.trainingTemplateId).subscribe(data=>{   
      this.toDo=data;
      console.log( this.toDo);
      if(typeof this.toDo !== 'undefined'){
        if(this.toDo.sets.length==0)
        {
          this.max =this.toDo.repeats;
        }
        else{
        this.max = this.toDo.repeats*this.toDo.sets.length
        this.setsToDisplay=[];
        this.FormSetsToDisplay();
        }
      }
    });
    this._httpPersonalTrain.GetPersonalTrainingById( this.AssignedTraining.personalTrainingId).subscribe(data=>{   
      this.personalTraining=data;
      this.trainingsToAdd =this.personalTraining.results
      
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
      console.log(this.trainingsToAdd)
      console.log( this.personalTraining);
    }); 
  }

  //----------------------------athleto redagavimo formos metodai-------------------

  OnSubmit()
  {
    this.negative=false;
    this.message ="";
    this.trainingsToAdd=[];
    console.log(this.trainingsToAddFull);
    this.trainingsToAddFull.forEach(element => {
      if (element.distance<0||element.paceMin<0||element.restMin<0||element.paceSec<0||element.restSec<0||element.paceSec>59||element.restSec>59)
      {
        this.negative= true; 
        this.translate.get('COMPETITIONS.ERRORSEC').subscribe((text:string) => {this.message=text});  
      //  this.message ="all training datas must be positive and seconds less than 60 "      
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
    console.log(this.trainingsToAdd);
    this.athleteForm.results = this.trainingsToAdd;
    console.log(this.athleteForm);
    this._httpPersonalTrain.UpdatePersonalTrainingResults(this.athleteForm, this.personalTraining.id).subscribe(data=>{   
      console.log(data);      
    })
    $('#myModal').modal("hide");
    var message
    this.translate.get('MESSAGES.UPDATEATHLETE').subscribe((text:string) => {message=text});  
      this.parentFun.emit(message);
  } 
   
}

OnClick()
{ var nullObject = {distance:null,paceMin:null,paceSec:null, restMin:null,restSec:null};
    
this.negative=false;
  if(this.trainingsToAddFull.length<this.max)
  {
    this.trainingsToAddFull.push(nullObject);    
  }
  else{
    this.negative=true;
    this.translate.get('MESSAGES.UPDATEATHLETE').subscribe((text:string) => {this.message=text});  
    //this.message ="Accordint to template you can only add this count of repeats"
      
  }

}

OnDelete(index:number)
{        
  this.negative=false;
  this.message =""
   this.trainingsToAddFull.splice(index, 1);
}
}
