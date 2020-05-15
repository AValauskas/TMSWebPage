import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './Components/Training Management/home/home.component';
import {TrainingTemplatesComponent} from './Components/Training Management/training-templates/training-templates.component';
import {LoginComponent} from './Components/Internal management/UnauthenticatedUser/login/login.component';
import {RegisterComponent} from './Components/Internal management/UnauthenticatedUser/register/register.component';
import {ForgetpassComponent} from './Components/Internal management/UnauthenticatedUser/forgetpass/forgetpass.component';
import {UserComponent} from './Components/Internal management/UnauthenticatedUser/user.component';
import { PersonalBestComponent } from './Components/Internal management/Personal/personal-best/personal-best.component';
import { PersonalInfoComponent } from './Components/Internal management/Personal/personal-info/personal-info.component';
import { PersonalStuffComponent } from './Components/Internal management/Personal/personal-stuff/personal-stuff.component';
import { AdminsideComponent } from './Components/Internal management/adminside/adminside.component';

const routes: Routes = [
{path: '', component: UserComponent,
children: [{path: '', component:LoginComponent}]},
{path: 'home', component: HomeComponent},
{path: 'admin', component: AdminsideComponent},
{path: 'trainingTemplates', component: TrainingTemplatesComponent},
{path: 'personalBest', component: PersonalBestComponent},
{path: 'personal', component: PersonalStuffComponent},
{path: 'personalInfo', component: PersonalInfoComponent},
{path: 'register', component: UserComponent,
children: [{path: '', component:RegisterComponent}]},
{path: 'login', component: UserComponent,
children: [{path: '', component:LoginComponent}]},
{path: 'login/:message', component: UserComponent,
children: [{path: '', component:LoginComponent}]},
{path: 'forgetpassword', component: UserComponent,
children: [{path: '', component:ForgetpassComponent}]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
