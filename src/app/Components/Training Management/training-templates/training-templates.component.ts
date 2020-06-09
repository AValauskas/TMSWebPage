import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ITrainingTemplate } from '../../../Interfaces/ITrainingTemplate';
import { ISetToDisplay } from 'src/app/Interfaces/ISetToDisplay';
import { TemplatetrainingsService } from 'src/app/services/API/templatetrainings.service';
import { ISetFull } from 'src/app/Interfaces/ISetFull';
import { TranslateService } from '@ngx-translate/core';
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
  popupName:string;

  setsToDisplay:ISetToDisplay[]=[];
  
  constructor(private _httpTemplate: TemplatetrainingsService, public _router:Router,public translate:TranslateService) { }

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
    this._httpTemplate.GetTrainingTemplates().subscribe(data=>{
      this.trainings = data
    });
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
    
    if(!this.negative)
    {
      var message;
        this.translate.get('MESSAGES.UPDATEDTRAIN').subscribe((text:string) => {message=text});   
        this.SuccesfullyMadeByCoachMessage(message);   
      this._httpTemplate.UpdateTrainingTemplate(this.training).subscribe(data=>{
        this.trainings = data
          
      });
      $('#myModal').modal("hide");
    }
  }

  InsertAction()
  {   
   
  if(!this.negative)
  {
      this._httpTemplate.PostTrainingTemplates(this.training).subscribe(data=>{
      this.trainings = data;
      this.trainingsToAddFull=[];
      this.trainingsToAdd=[];
      if(localStorage.getItem("error")==null)
      { 
      }
      else{
        this.error=localStorage.getItem("error");
        localStorage.removeItem("error");
      }    
    });
    var message;
    this.translate.get('MESSAGES.TRAININSERT').subscribe((text:string) => {message=text});   
    this.SuccesfullyMadeByCoachMessage(message);
    $('#myModal').modal("hide");
  }
  }
 

  FillData(){
    this.negative=false;
    this.trainingsToAdd=[];
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

    this.training.sets=this.trainingsToAdd;    
   this.training.destinition=Number(this.training.destinition);
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
    if(modal=="insert")
    {
    this.training = <any>{};
    this.insertModalActive= true;
    this.updateModalActive= false;
    this.deleteModalActive = false;
    this.translate.get('TEMPLATES.ADDTRAIN').subscribe((text:string) => {this.popupName=text});   
    //this.popupName="ADD TRAINING";
    $('#myModal').modal("show");
    }
    else if(modal=="update")
    {    
      //this.popupName="UPDATE TRAINING";
      this.translate.get('TEMPLATES.UPDATETRAIN').subscribe((text:string) => {this.popupName=text});   
      this.trainingsToAddFull=[];
      this.trainingsToAdd=[];
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

    this.trainings = this.trainings.filter(obj => obj !== this.training);
    this._httpTemplate.DeleteTrainingTemplate(this.training.id).subscribe(data=>{ 
        this.trainings = data;
    })  
    this.training=null;
    var message;
    this.translate.get('MESSAGES.TRAINDELETED').subscribe((text:string) => {message=text});   
    this.SuccesfullyMadeByCoachMessage(message);  
    $('#myModalDelete').modal("hide");
  }

  ChangeDescriptionSize()
  {
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
  }

}

