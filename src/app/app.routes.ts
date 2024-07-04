import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { PrivateChatsComponent } from './private-chats/private-chats.component';
import { GroupChatsComponent } from './group-chats/group-chats.component';

export const routes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'home', component: HomeComponent, children: [
        { path: 'privatechats', component: PrivateChatsComponent },
        { path: 'groupchats', component: GroupChatsComponent }
      ]},
    // Add other routes here
    { path: '', redirectTo: '/signin', pathMatch: 'full' }
];
