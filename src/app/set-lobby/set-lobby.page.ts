import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { getNumberOfCurrencyDigits } from '@angular/common';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-set-lobby',
  templateUrl: './set-lobby.page.html',
  styleUrls: ['./set-lobby.page.scss'],
})
export class SetLobbyPage implements OnInit {

  constructor(
    public afStore: AngularFirestore,
    public alert: AlertController,
    public user: UserService,
    public afAuth: AngularFireAuth
    ) {
      //this.mainuser = afStore.doc(`users/${user.getUID()}`)
      //this.createrUID = user.getcurretUID()
    }

  lobbyname: string = ""
  lobbydescription: string = ""
  mainuser: AngularFirestoreDocument
  //createrUID
  //created

  // getUID() {
  //   this.afStore.doc(`users/${res.user.uid}`).get({ 
  //     createrUID
  //   })
  // }

  //createruid = new Observable(this.mainuser)
  
  ngOnInit() {
  }

  async lobbysetup() {
    const createrUID: string = await this.afAuth.auth.currentUser.uid
    const {lobbyname,lobbydescription} =  this
    if (lobbyname.length > 0) {
      this.afStore.collection(`lobby`).add({
        lobbyname,
        lobbydescription,
        createrUID
        //createrUID : getUID()
      })
    } else {
      return alert('Please Enter Lobby Name')
    }
    
  }

}
