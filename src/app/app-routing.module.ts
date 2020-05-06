import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './Components/pages/home/home.component';
import {TrainingTemplatesComponent} from './Components/pages/training-templates/training-templates.component';
import {LoginComponent} from './Components/userBegin/login/login.component';
import {RegisterComponent} from './Components/userBegin/register/register.component';
import {ForgetpassComponent} from './Components/userBegin/forgetpass/forgetpass.component';
import {UserComponent} from './Components/userBegin/user.component';
import { PersonalBestComponent } from './Components/pages/user/personal-best/personal-best.component';
import { PersonalInfoComponent } from './Components/pages/user/personal-info/personal-info.component';
import { PersonalStuffComponent } from './Components/pages/user/personal-stuff/personal-stuff.component';

const routes: Routes = [
{path: '', component: UserComponent,
children: [{path: '', component:LoginComponent}]},
{path: 'home', component: HomeComponent},
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
