import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '', //default
    component: TabsPage, // localhost/tabs/...
    children: [
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)},
      { path: 'search', loadChildren: () => import('../search/search.module').then(m => m.SearchPageModule)},
      { path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsRoutingModule {}
