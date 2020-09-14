import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PhoneComponent } from './components/phone/phone.component';

const routes: Routes = [
  { path:'', component:LoginComponent},
  { path: 'phone', component: PhoneComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
