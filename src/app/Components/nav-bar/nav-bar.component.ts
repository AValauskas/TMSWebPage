import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/API/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  Role: string;
  RoleToDisplay: string;
  changeDetected:Boolean;
  successMessage=false;
  failMessage = false;
  message="";
  language:String;
  constructor(public _auth:AuthService, public translate: TranslateService ) { 
    translate.addLangs(['en', 'lt']);
    translate.setDefaultLang('lt');       
    const browserLang = translate.getBrowserLang();
    this.language = localStorage.getItem("lang");
   // translate.use(browserLang.match( /en|lt/)? browserLang : 'lt');
   translate.use(localStorage.getItem("lang"))
  }

  ngOnInit(): void {
    this.Role=localStorage.getItem('role')
    this.SetRole();
  }

  ngDoCheck(): void
  {
   if (localStorage.getItem('role') !== this.Role) {
     this.changeDetected = true;
     this.Role=localStorage.getItem('role')
     console.log(localStorage.getItem('role'))
     this.SetRole();
   }
  
  }

  ngOnChanges(changeDetected)
  {
    this.SetRole();
  }

  SetRole()
   {
    var backRole=localStorage.getItem('role')
    if(backRole=="Athlete") 
    {
     
      this.translate.get('HOME.ATHLETE').subscribe((text:string) => {this.RoleToDisplay=text});   
    } 
    else if (backRole=="Coach")
    {
      this.translate.get('HOME.COACH').subscribe((text:string) => {this.RoleToDisplay=text});   
    }
    else if (backRole=="Admin")
    {
      this.translate.get('HOME.ADMIN').subscribe((text:string) => {this.RoleToDisplay=text});   
    }
   }

  ChangeLanguage(lang)
  {
    localStorage.setItem("lang",lang);
    this.language=lang;
    this.translate.use(localStorage.getItem("lang"));
    this.SetRole();
  }

  async TurnOnSuccesMessage(message)
  {
    console.log(message);
    this.failMessage = false;
    this.successMessage = true;
    this.message = message;
    await this.delay(3000);
    this.successMessage = false;
    this.message="";
  }

  async TurnOnFailMessage(message)
  {
    console.log("atieji");
    this.successMessage = false;
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
