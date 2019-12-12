import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from './../services/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
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
  constructor(
    private authService: AuthenticationService,
    public afStore: AngularFirestore,
    public router: Router,
    public user: UserService
    ) { 
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
        // const home = this.afStore.collection('lobby').get()
        } else {
          this.router.navigate(['/tabs/home']);
        }
      });
  }
  
  createlobby() {
    this.router.navigate(['tabs/set-lobby']);
  }

  enterChat(key) {
    this.router.navigate(['tabs/chat/'+key])
  }
  logout() {
    this.authService.logout();
  }
}

// // Generate a reference to a new location and add some data using push()
// var newPostRef = postsRef.push({
//   author: "gracehop",
//   title: "Announcing COBOL, a New Programming Language"
// });
// // Get the unique ID generated by push() by accessing its key
// var postID = newPostRef.key;
