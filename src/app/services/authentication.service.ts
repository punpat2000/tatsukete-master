import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

const TOKEN_KEY = 'auth-token'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject<boolean>(false);

  constructor(
    private storage: Storage,
    private afAuth: AngularFireAuth,
    private router: Router
    ) {
    this.afAuth.auth.onAuthStateChanged( user => {
      if(user)
        this.authenticationState.next(true);
      else
        this.authenticationState.next(false);
    })
  }
  login() {
    this.storage.set(TOKEN_KEY,'Username Password');
    this.router.navigate(['tabs']);
  }
  async logout() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }
  isAuthenticated(): Observable<boolean> {
    return this.authenticationState.asObservable();
  }
  checkToken() {
    return this.storage.get(TOKEN_KEY).then(res=>{
      if(res) {
        this.authenticationState.next(true);
      }
    })
  }
}