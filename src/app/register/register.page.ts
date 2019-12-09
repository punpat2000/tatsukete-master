import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { Router } from '@angular/router'      
import { AlertController } from '@ionic/angular'
import { UserService } from '../user.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  check: boolean
  username: string = ""
  password: string = ""
  cpassword: string = ""
  

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public user: UserService,
    public afStore: AngularFirestore
    ) { }

  ngOnInit() {
  }

  async register() {
    const {username, password, cpassword} = this
    if(password !== cpassword) {
      this.showAlert("Error","Password doesn't match")
      return console.error("oh boy!")
    }
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username+'@gmail.com',password)
      console.log(res)
      this.showAlert("Success","Welcome Aboard!")
      this.afStore.doc(`users/${res.user.uid}`).set({ 
        username
      })

      this.user.setUser({
        username,
        uid: res.user.uid
      })
      this.router.navigate(['/login']) //redirect page if condition fulfilled
    } catch(err) {
      console.dir(err)
      this.showAlert("Error",err.message)
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
}

