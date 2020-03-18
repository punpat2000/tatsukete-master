import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService} from './services/auth-guard.service'
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  { path: 'register',loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)},
  { path: 'tabs', canActivate: [AuthGuardService],loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'edit-profile',canActivate: [AuthGuardService],loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)},
  { path: 'chat',canActivate: [AuthGuardService], loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule)},
  { path: 'set-lobby',canActivate: [AuthGuardService], loadChildren: () => import('./set-lobby/set-lobby.module').then(m => m.SetLobbyPageModule)},
];

//localhost/tabs

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
