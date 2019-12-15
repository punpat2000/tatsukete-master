import { Component, OnInit , OnDestroy} from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { UserService } from '../user.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit,OnDestroy {
  mainuser: AngularFirestoreDocument
  sub
  username: string
  profilePic: string


  constructor(private afs: AngularFirestore,private user: UserService,) { 
    this.mainuser = afs.doc(`users/${user.getUID()}`)
    this.sub = this.mainuser.valueChanges().subscribe(event=>{
    this.username = event.username
    this.profilePic = event.profilePic
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
  ngOnInit() {
  }

}
