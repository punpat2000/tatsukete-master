import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent} from '../chat/chat.component'
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '', //default
    component: TabsPage, // localhost/tabs/...
    children: [
      { path: 'home', loadChildren: '../home/home.module#HomePageModule'},
      { path: 'search', loadChildren: '../search/search.module#SearchPageModule'},
      { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule'},
      { path: 'edit-profile',loadChildren: '../edit-profile/edit-profile.module#EditProfilePageModule'},
      { path: 'set-lobby', loadChildren: '../set-lobby/set-lobby.module#SetLobbyPageModule'},
      { path: 'chat/:id', component: ChatComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsRoutingModule {}
