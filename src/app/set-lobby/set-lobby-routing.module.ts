import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetLobbyPage } from './set-lobby.page';

const routes: Routes = [
  {
    path: '',
    component: SetLobbyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetLobbyPageRoutingModule {}
