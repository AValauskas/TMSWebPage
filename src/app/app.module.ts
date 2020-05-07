import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/pages/home/home.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './Components/userBegin/login/login.component';
import { RegisterComponent } from './Components/userBegin/register/register.component';
import { UserComponent } from './Components/userBegin/user.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TrainingTemplatesComponent } from './Components/pages/training-templates/training-templates.component';
import { PersonalBestComponent } from './Components/pages/user/personal-best/personal-best.component';
import { PersonalInfoComponent } from './Components/pages/user/personal-info/personal-info.component';
import { InvitationsComponent } from './Components/invitations/invitations.component';
import { PersonalStuffComponent } from './Components/pages/user/personal-stuff/personal-stuff.component';
import { CompetitionsComponent } from './Components/pages/user/competitions/competitions.component';
import { TrainingsComponent } from './Components/pages/user/trainings/trainings.component';
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
import { ForgetpassComponent } from './Components/userBegin/forgetpass/forgetpass.component';
import { AdminsideComponent } from './Components/adminside/adminside.component';




//import { NavbarComponent } from './navbar/navbar.component';


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
    TrainingsComponent,
    PersonalTrainingModalComponent,
    CoachTrainingAssignModalComponent,
    AthleteListComponent,
    NewCompetitionModalComponent,
    ForgetpassComponent,
    AdminsideComponent,
    
  ],
  imports: [
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
