import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService} from './services/auth-guard.service'
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  { path: 'register',loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)},
  { path: 'tabs', canActivate: [AuthGuardService],loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'edit-profile',canActivate: [AuthGuardService],loadChildren: './edit-profile/edit-profile.module#EditProfilePageModule'},
  { path: 'chat',canActivate: [AuthGuardService], loadChildren: './chat/chat.module#ChatPageModule'},
  { path: 'set-lobby',canActivate: [AuthGuardService], loadChildren: './set-lobby/set-lobby.module#SetLobbyPageModule'},
];

//localhost/tabs

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
