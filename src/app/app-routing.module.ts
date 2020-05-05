import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegistrationComponent
    },
    {
        path: 'profile',
        component: UserProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'home',
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
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})], 
    exports: [RouterModule]
})
export class AppRoutingModule { }