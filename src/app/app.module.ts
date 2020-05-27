import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/Training Management/home/home.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule,HttpClient} from '@angular/common/http';
import { LoginComponent } from './Components/Internal management/UnauthenticatedUser/login/login.component';
import { RegisterComponent } from './Components/Internal management/UnauthenticatedUser/register/register.component';
import { UserComponent } from './Components/Internal management/UnauthenticatedUser/user.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { TrainingTemplatesComponent } from './Components/Training Management/training-templates/training-templates.component';
import { PersonalBestComponent } from './Components/Internal management/Personal/personal-best/personal-best.component';
import { PersonalInfoComponent } from './Components/Internal management/Personal/personal-info/personal-info.component';
import { InvitationsComponent } from './Components/Internal management/invitations/invitations.component';
import { PersonalStuffComponent } from './Components/Internal management/Personal/personal-stuff/personal-stuff.component';
import { CompetitionsComponent } from './Components/Internal management/Personal/competitions/competitions.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import { PersonalTrainingModalComponent } from './Components/Modals/personal-training-modal/personal-training-modal.component';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CoachTrainingAssignModalComponent } from './Components/Modals/coach-training-assign-modal/coach-training-assign-modal.component';
import { AthleteListComponent } from './Components/Modals/athlete-list/athlete-list.component';
import { NewCompetitionModalComponent } from './Components/Modals/new-competition-modal/new-competition-modal.component';
import { ForgetpassComponent } from './Components/Internal management/UnauthenticatedUser/forgetpass/forgetpass.component';
import { AdminsideComponent } from './Components/Internal management/adminside/adminside.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http:HttpClient)
{
  return new TranslateHttpLoader(http);
}



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    NavBarComponent,
    TrainingTemplatesComponent,
    PersonalBestComponent,
    PersonalInfoComponent,
    InvitationsComponent,
    PersonalStuffComponent,
    CompetitionsComponent,
    PersonalTrainingModalComponent,
    CoachTrainingAssignModalComponent,
    AthleteListComponent,
    NewCompetitionModalComponent,
    ForgetpassComponent,
    AdminsideComponent,
    
  ],
  imports: [
    TranslateModule.forRoot({
      loader: 
      {
      provide:TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
      }
    }),
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
     HttpClientModule,
     FullCalendarModule,
     NgbModalModule,
     FlatpickrModule.forRoot(),
     CalendarModule.forRoot({
       provide: DateAdapter,
       useFactory: adapterFactory,
     }),
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
