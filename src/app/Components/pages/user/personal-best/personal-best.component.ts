import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRecords, IRecordsByPlace } from 'src/app/Interfaces/IRecords';
import { PersonalmanagementService } from 'src/app/services/API/PersonalManagement/personalmanagement.service';

@Component({
  selector: 'app-personal-best',
  templateUrl: './personal-best.component.html',
  styleUrls: ['./personal-best.component.scss']
})
export class PersonalBestComponent implements OnInit {

  
  Records: IRecords[];
  Inside:IRecordsByPlace[];
  Outside:IRecordsByPlace[];
  isFriend = false;
  friend:string

  constructor(private _httpManagement: PersonalmanagementService, public _router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("friend")!=null)
    {
        this.isFriend = true;
        this.friend=localStorage.getItem("friendId");
        console.log(this.friend);
        this.FillFormOther();  
    }
    else{
      this.isFriend= false;
      this.FillFormOwn();   
    }
  }

  FillFormOwn()
  {
    this._httpManagement.GetRecords().subscribe(data=>{    
      this.Records = data
      if( this.Records.length>0)
      {
        if(this.Records.length==1)
        {
            if(this.Records[0].records[0].place=="Outside")
            {
              this.Outside =this.Records[0].records;
            }
            else{
              this.Inside =this.Records[0].records;
            }
        }
        else{
        this.Outside =this.Records[0].records;
        this.Inside =this.Records[1].records;    
        }
        this.FixTimeToNormal();
      }      
    })

  }


  FillFormOther()
  {
    this._httpManagement.GetRecordsOther(this.friend).subscribe(data=>{    
      this.Records = data
      if( this.Records.length>0)
      {
        if(this.Records.length==1)
        {
            if(this.Records[0].records[0].place=="Outside")
            {
              this.Outside =this.Records[0].records;
            }
            else{
              this.Inside =this.Records[0].records;
            }
        }
        else{
        this.Outside =this.Records[0].records;
        this.Inside =this.Records[1].records;    
        }
        this.FixTimeToNormal();
      }      
    })

  }

  FixTimeToNormal()
  {
    if(this.Outside!=null){
    if( this.Outside.length>0){
    this.Outside.forEach(element => {
      var num = Number(element.time);
      var fullTime = num/60;
      if(fullTime>1)
      {
        var minZero="";
          var secZero="";
          var mins = Math.trunc(fullTime)
          var seconds = (num-mins*60)
          var sconds = (num-mins*60).toFixed(2);
          if(mins<10) 
          {
            minZero="0";
          } 
          if(seconds<10) 
          {
            secZero="0";
          } 
          element.time = minZero+mins+ ":"+secZero+sconds;
      }   
        });  
      }} 
      if(this.Inside!=null){
        if( this.Inside.length>0){
    this.Inside.forEach(element => {
      var num = Number(element.time);
      var fullTime = num/60;
      if(fullTime>1)
      {
        var minZero="";
        var secZero="";
        var mins = Math.trunc(fullTime)
        var seconds = (num-mins*60)
        var sconds = (num-mins*60).toFixed(2);
        if(mins<10) 
        {
          minZero="0";
        } 
        if(seconds<10) 
        {
          secZero="0";
        } 
        element.time = minZero+mins+ ":"+secZero+sconds;
      }   
        });  }}

  }

  ngAfterViewInit(): void
  {    
    
  }
}
