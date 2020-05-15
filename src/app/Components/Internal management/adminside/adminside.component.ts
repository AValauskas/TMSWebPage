import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/API/admin.service';
import { Iuser } from 'src/app/Interfaces/IUser';
import { AuthService } from 'src/app/services/API/auth.service';
import { TranslateService } from '@ngx-translate/core';
declare var $ :any;

@Component({
  selector: 'app-adminside',
  templateUrl: './adminside.component.html',
  styleUrls: ['./adminside.component.scss']
})
export class AdminsideComponent implements OnInit {
  Role="";
  deleteModalActive=false;
  insertModalActive=false;
  error="";
  users:any[];
  userRegister= <Iuser>{};
  successMessage= false;
  failMessage= false;
  message:string;
  idToDelete="";
  constructor(public _router:Router, public _httpAdmin: AdminService,  public translate:TranslateService) { }

  ngOnInit(): void {
    if(localStorage.getItem('role')==null)
    {
      this._router.navigateByUrl('/login');
    }   
    this.Role=localStorage.getItem('role');
    console.log(this.Role);
    if(this.Role!="Admin")
    {
      this._router.navigateByUrl('/home');
    }

    this._httpAdmin.GetUsers().subscribe(data=>{     
      this.users=data;
      console.log(data); 
    })
  }

  DeleteUser()
  {
    this._httpAdmin.DeleteUser(this.idToDelete).subscribe(
      data=>{          
        this.users=data;
        $('#myModalDelete').modal("hide");
        var message
        this.translate.get('HOME.USERDELETED').subscribe((text:string) => {message=text});   
        this.SuccesfullyMessage(message);
      }    
    ) 
  }


  OpenModalInsert()
  {

    this.userRegister = <any>{};
    this.insertModalActive= true;
    this.deleteModalActive = false;
    $('#myModal').modal("show");  
  }

  OpenModalDelete( id)
  {
    console.log(id);
      this.insertModalActive= false;
      this.deleteModalActive = true;
      $('#myModalDelete').modal("show");
      this.idToDelete=id; 
  }


     
  OnSubmit()
  {
      console.log(this.userRegister);
      if(!this.isAlphaNum(this.userRegister.password)){
        this.translate.get('MESSAGES.VALIDATEFAILED').subscribe((text:string) => {this.error=text});   
      //  this.error="Password must contain numbers and letters";
      }
      else{
        this.userRegister.role="Admin";
      this._httpAdmin.InsertAdmin(this.userRegister).subscribe(
        data=>{  
          this.HandleError();
          this.users=data;
        }    
      )  
    }
  }


  isAlphaNum(s){ // this function tests it
    var p = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
     return p.test(s);
     }


     HandleError()
     {
       if(localStorage.getItem('error') !=null)
       {
         this.error= localStorage.getItem('error' );
         localStorage.removeItem('error');
       }
       else{
        $('#myModal').modal("hide");   
        var message
        this.translate.get('HOME.INSERTADMIN').subscribe((text:string) => {message=text});   
        this.SuccesfullyMessage(message);
         this.error= null;      
       }
     }


     async SuccesfullyMessage(message)
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
}
