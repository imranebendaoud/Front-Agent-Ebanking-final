import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from "./components/login/login.component";
import { AuthGuardService } from "./services/login/auth-guard.service";
import { NotfoundComponent } from "./components/notfound/notfound.component";

const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: '',
    redirectTo:'/login',
    pathMatch:'full'
  },

  {
    path: "",
    component: AdminLayoutComponent,
    canActivate:[AuthGuardService],
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
      },
      {path: '404', component: NotfoundComponent},
      {path: '**', redirectTo: '/404'},
    ]
  }, 
  /*
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  },
  {
    path: "**",
    redirectTo: "dashboard"
  }*/
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
