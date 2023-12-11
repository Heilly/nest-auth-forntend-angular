import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/authLayout/authLayout.component';
import { LoginPagesComponent } from './pages/loginPages/loginPages.component';
import { RegisterPageComponent } from './pages/registerPage/registerPage.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children:[
      {path: 'login', component: LoginPagesComponent},
      { path: 'register', component: RegisterPageComponent },
      { path: '**', redirectTo: 'login' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
