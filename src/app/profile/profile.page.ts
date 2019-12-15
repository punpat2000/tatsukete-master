import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { UserService } from '../user.service'
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  mainuser: AngularFirestoreDocument
  userPosts
  sub
  username: string
  profilePic: string


  constructor(private afs: AngularFirestore,private user: UserService) { 
    this.mainuser = afs.doc(`users/${user.getUID()}`)
    this.userPosts = this.mainuser.valueChanges().subscribe(event=>{
    this.username = event.username
    this.profilePic = event.profilePic
    })
  }

  ngOnDestroy() {
    this.sub = this.userPosts
    console.log(this.sub)
    this.sub.unsubscribe();
  }
  ngOnInit() {
  }

}
