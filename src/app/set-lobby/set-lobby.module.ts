import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetLobbyPageRoutingModule } from './set-lobby-routing.module';

import { SetLobbyPage } from './set-lobby.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetLobbyPageRoutingModule
  ],
  declarations: [SetLobbyPage]
})
export class SetLobbyPageModule {}
