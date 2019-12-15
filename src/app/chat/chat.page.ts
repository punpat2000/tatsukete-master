import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  lobbykey: string;
  nickname: string;
  chatMessage: string;

  chats = [];
  offStatus = false;

  @ViewChild(IonContent,{static:true}) content: IonContent;

  constructor(
    public router: Router,
    public route: ActivatedRoute
  ) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.lobbykey = this.route.snapshot.paramMap.get('key') as string;
        var index = user.email.indexOf("@");
        this.nickname = user.email.substring(0, index);

        this.sendJoinMessage();
        this.displayChatMessage();
        this.scroll();
      } else {
        this.router.navigate(['tabs/home']);
      }
    });
  }

  ngOnInit() {
  }

  displayChatMessage() {
    firebase.database()
      .ref('lobby/' + this.lobbykey + '/chats')
      .on('value', resp => {
        if (resp) {
          this.chats = [];
          resp.forEach(childSnapshot => {
            const chat = childSnapshot.val();
            chat.key = childSnapshot.key;
            this.chats.push(chat);
          });
        }
      });
  }

  private scroll() {
    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, 1000);
  }

  exitChat() {
    this.sendExitMessage();
    this.offStatus = true;
    this.router.navigate(['tabs/home']);
  }

  sendChatMessage() {
    this.sendMessage('message', this.chatMessage);
  }

  sendJoinMessage() {
    this.sendMessage('join', this.nickname + ' has joined this room.');
  }

  sendExitMessage() {
    this.sendMessage('exit', this.nickname + ' has exited this room.');
  }

  sendMessage(type: string, message: string) {
    const newData = firebase.database().ref('lobby/' + this.lobbykey + '/chats').push();
    newData.set({
      type: type,
      user: this.nickname,
      message: message,
      sendDate: Date()
    });
    this.chatMessage = ""
    this.scroll();
  }

}

