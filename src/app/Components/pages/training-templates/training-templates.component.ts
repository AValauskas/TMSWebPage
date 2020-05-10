import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ITrainingTemplate } from '../../../Interfaces/ITrainingTemplate';
import { ISetToDisplay } from 'src/app/Interfaces/ISetToDisplay';
import { TemplatetrainingsService } from 'src/app/services/API/templatetrainings.service';
import { ISetFull } from 'src/app/Interfaces/ISetFull';
declare var $ :any;


@Component({
  selector: 'app-training-templates',
  templateUrl: './training-templates.component.html',
  styleUrls: ['./training-templates.component.scss']
})
export class TrainingTemplatesComponent implements OnInit {
  error:string;
  Role: string;
  trainings: ITrainingTemplate[]=[];
  trainingsToAdd: { distance: number, pace: number, rest: number }[] = [];
  trainingsToAddFull: ISetFull[] = [];
  Choosen: { distance: number, pace: number, rest: number }[] = [];
  train: { distance: number, pace: number, rest: number };
  training:ITrainingTemplate;
  belongsToUser= false;
  deleteModalActive =false;
  updateModalActive =false;
  insertModalActive =false;
  descriptionClicked = false;
  setsClicked = false;
  manageClicked = false;
  successMessage= false;
  failMessage= false;
  message:string;
  negative =false;

  setsToDisplay:ISetToDisplay[]=[];
  
  constructor(private _httpTemplate: TemplatetrainingsService, public _router:Router) { }

  ngOnInit(): void {
    this.Role=localStorage.getItem('role')
    localStorage.removeItem("friend");
    localStorage.removeItem("friendId");   
    localStorage.removeItem("visit");
  }

  ngAfterViewInit(): void
  {
    this.Role=localStorage.getItem('role')
    this.UploadTraining();
  }


UploadTraining()
{
  //if( this.Role=="Athlete")
  //{
    this._httpTemplate.GetTrainingTemplates().subscribe(data=>{
      this.trainings = data
      console.log(this.trainings)
    });
/*  }else{
  this._httpTemplate.GetTrainingTemplatesIncludedPersonal().subscribe(data=>{
    this.trainings = data
    console.log(this.trainings)
  })
}*/

}


  OnSubmit()
  {
    this.FillData();
     if(this.insertModalActive){
      this.InsertAction();
     } else{
       this.UpdateAction();
     }    
   
  }

  UpdateAction()
  {
    this.trainingsToAdd=[];
    this.trainingsToAddFull=[];
    this.negative= false;
    this.training.sets.forEach(element => {
      if (element.distance<0||element.pace<0||element.rest<0)
      {
        this.negative= true;
      }
  })
    if(!this.negative)
    {
      this._httpTemplate.UpdateTrainingTemplate(this.training).subscribe(data=>{
        this.trainings = data
        this.SuccesfullyMadeByCoachMessage("You have succesfully updated training");     
      });
      $('#myModal').modal("hide");
    }
  }

  InsertAction()
  {
    
    this.negative= false;
    this.training.sets.forEach(element => {
      if (element.distance<0||element.pace<0||element.rest<0)
      {
        this.negative= true;
      }
  })
  if(!this.negative)
  {
      this._httpTemplate.PostTrainingTemplates(this.training).subscribe(data=>{
      this.trainings = data;
      this.trainingsToAddFull=[];
      this.trainingsToAdd=[];
      if(localStorage.getItem("error")==null)
      {
      console.log("good")     
      }
      else{
        this.error=localStorage.getItem("error");
        localStorage.removeItem("error");
      }    
    });
    this.SuccesfullyMadeByCoachMessage("You have succesfully inserted training");
    $('#myModal').modal("hide");
  }
  }
 

  FillData(){
    this.negative=false;
    this.trainingsToAdd=[];
    console.log(this.trainingsToAddFull);
    this.trainingsToAddFull.forEach(element => {
      if (element.distance<0||element.paceMin<0||element.restMin<0||element.paceSec<0||element.restSec<0||element.paceSec>59||element.restSec>59)
      {
        this.negative= true;       
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
  this.trainingsToAddFull=[];
    this.training.sets=this.trainingsToAdd;    
   this.training.destinition=Number(this.training.destinition);
    console.log(this.training);

  }

  
  OnClick()
  { var nullObject = {distance:null,paceMin:null,paceSec:null, restMin:null,restSec:null};
      this.trainingsToAddFull.push(nullObject);   
  }

  OnDelete(index:number)
  {        
     this.trainingsToAddFull.splice(index, 1);
  }

  ChooseTraining(trainingTemplateId)
  {
    this.trainingsToAdd=[];
    this.trainingsToAddFull=[];
      this.insertModalActive= false;
      this.training = this.trainings.filter(x=>x.id==trainingTemplateId)[0];
      if(this.training.owner == localStorage.getItem('user'))
      {this.belongsToUser= true;}
      else{this.belongsToUser= false;}
      this.setsToDisplay=[];
      this.FormSetsToDisplay();
      
  }


  OpenModal(modal)
  {
    console.log(modal);
    
    if(modal=="insert")
    {
    this.training = <any>{};
    this.insertModalActive= true;
    this.updateModalActive= false;
    this.deleteModalActive = false;
    $('#myModal').modal("show");
    }
    else if(modal=="update")
    {    
      this.trainingsToAddFull=[];
      this.trainingsToAdd=[];
      console.log(this.training);
    this.insertModalActive= false;
    this.updateModalActive= true;
    this.deleteModalActive = false;
    this.training.sets.forEach(val =>  this.trainingsToAdd.push(Object.assign({}, val)));
       this.trainingsToAdd.forEach(element => {

        var paceMin=Math.trunc(element.pace/60);
        var paceSec=element.pace-paceMin*60;
        var restMin=Math.trunc(element.rest/60);
        var restSec=element.rest-restMin*60;
        var trainObject = {distance:element.distance,paceMin:paceMin,paceSec:paceSec, restMin:restMin,restSec:restSec};      
        this.trainingsToAddFull.push(trainObject);   
      })
    $('#myModal').modal("show");
    }
    else{
      this.insertModalActive= false;
      this.updateModalActive= false;
      this.deleteModalActive = true;
      $('#myModalDelete').modal("show");
    }
    

  }
  DeleteTemplate()
  {
    this._httpTemplate.DeleteTrainingTemplate(this.training.id).subscribe(data=>{ 
        this.trainings = data;
    })  
    this.training=null;
    this.SuccesfullyMadeByCoachMessage("You have succesfully deleted item");  
    $('#myModalDelete').modal("hide");
  }

  ChangeDescriptionSize()
  {
    console.log("clicked");
    if( this.descriptionClicked)
    {
      this.descriptionClicked= false;
    }
    else{
      this.descriptionClicked= true;
    }


  }

  changeTimes()
  {
    if( this.setsClicked)
    {
      this.setsClicked= false;
    }
    else{
      this.setsClicked= true;
      
    }
  }

  
  changeManage()
  {
    if( this.manageClicked)
    {
      this.manageClicked= false;
    }
    else{
      this.manageClicked= true;
    }
  }

  onChangeType(newType)
  {
    if(newType=="All")
    {
      this.UploadTraining();
    }   
    else{
    this._httpTemplate.GetTrainingsByType(newType).subscribe(data=>{   
      this.trainings=data;
      //this.trainings=this.Trainings.length;
      });   
    }
  }

  async SuccesfullyMadeByCoachMessage(message)
    {
      console.log(message);
      this.successMessage = true;
      this.message = message;
      await this.delay(3000);
      this.successMessage = false;
      this.message="";
    }

   delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }


  FormSetsToDisplay()
  {
    this.training.sets.forEach(element => {
        
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

}

