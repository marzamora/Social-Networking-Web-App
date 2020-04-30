import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegistrationComponent
    },
    {
        path: 'profile',
        component: UserComponent
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    // {
    //     path: '**',
    //     component: HomeComponent,
    //     canActivate: [AuthGuard]
    // }
];

@NgModule({
    // imports: [RouterModule.forRoot(routes, {enableTracing: true})],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }