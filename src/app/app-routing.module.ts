import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddClientComponent} from '../app/components/add-client/add-client.component'
import {ClientDetailsComponent} from '../app/components/client-details/client-details.component'
import {DashboardComponent} from '../app/components/dashboard/dashboard.component'
import {EditClientComponent} from '../app/components/edit-client/edit-client.component'
import {NotFoundComponent} from '../app/components/not-found/not-found.component'
import {RegisterComponent} from '../app/components/register/register.component'
import {SettingsComponent} from '../app/components/settings/settings.component'
import {SidebarComponent} from '../app/components/sidebar/sidebar.component'
import {LoginComponent} from '../app/components/login/login.component'

const routes: Routes = [
  { path: 'client/add/:id', component: AddClientComponent },
  { path: 'client/:id', component: ClientDetailsComponent },
  { path: '', component: DashboardComponent },
  { path: 'client/edit:id', component: EditClientComponent },
  {path:'login', component:LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
