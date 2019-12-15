import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from './../services/authentication.service';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  lobbies=[]
  mainuser: AngularFirestoreDocument
  userPosts
  sub
  username: string
  constructor(
    private authService: AuthenticationService,
    public afStore: AngularFirestore,
    public router: Router,
    public user: UserService
    ) { 
    this.mainuser = afStore.doc(`users/${user.getUID()}`)
    this.userPosts = this.mainuser.valueChanges().subscribe(event=>{
    this.username = event.username
    })
    }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref('/lobby').on('value', resp => {
          if (resp) {
            this.lobbies = [];
            resp.forEach(childSnapshot => {
              const lobby = childSnapshot.val();
              lobby.key = childSnapshot.key;
              this.lobbies.push(lobby);
            });
          }
        });
        } else {
          this.router.navigate(['/tabs/home']);
        }
      });
  }
  
  ngOnDestroy() {
    this.sub = this.userPosts
    console.log(this.sub)
    this.sub.unsubscribe();
  }
  createlobby() {
    this.router.navigate(['/set-lobby']);
  }

  enterChat(key) {
    this.router.navigate(['/chat/'+key])
  }
  logout() {
    this.authService.logout();
  }
}
