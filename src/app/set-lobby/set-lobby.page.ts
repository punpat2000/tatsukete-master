import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { getNumberOfCurrencyDigits } from '@angular/common';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-set-lobby',
  templateUrl: './set-lobby.page.html',
  styleUrls: ['./set-lobby.page.scss'],
})
export class SetLobbyPage implements OnInit {

  lobbyname : string=""

  constructor(
    public afStore: AngularFirestore,
    public alert: AlertController,
    public user: UserService,
    public afAuth: AngularFireAuth,
    private router: Router
    ) {}

  
  ngOnInit() {
  }

  lobbysetup() {
    // const {lobbyname} = this
    // if (lobbyname.length > 0) {
    //   this.afStore.collection(`lobby`).add({
    //     lobbyname
    //   })
    // } else {
    //   return this.showAlert('Hey!','Please Enter Lobby Name')
    // }
    // this.showAlert("Success","Lobby added!")
    // this.router.navigate(['tabs/home'])
    if (this.lobbyname.length > 0) {
      const {lobbyname} = this
      this.afStore.collection(`lobby`).add({
            lobbyname
      })
      const newData = firebase.database().ref('lobby/')
      .push({
        lobbyname: this.lobbyname
      });
      this.router.navigate(['/tabs/home']);
      }
    else {
      this.showAlert('Hey!','Please Enter Lobby Name')
    }

  }

  async showAlert(header: string,message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    })
    await alert.present()
  }
  // lobbysetup() {
  //   const {lobbyname} =  this
  //   if (lobbyname.length > 0) {
  //     this.afStore.collection(`lobby`).add({
  //       lobbyname
  //       //createrUID : getUID()
  //     })
  //   } else {
  //     return alert('Please Enter Lobby Name')
  //   }
    
  // }

}
