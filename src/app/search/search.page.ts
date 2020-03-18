import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('myselect',{static:true}) selectComponent;
  searchterm:string;
  startAt = new Subject();
  endAt = new Subject();

  lobbies;

  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  constructor(public afs: AngularFirestore,public alert: AlertController,) {
  }
  
  ngOnInit() {
    Observable.combineLatest(this.startobs,this.endobs).subscribe((value)=>{
      this.firequery(value[0],value[1]).subscribe((lobbies)=>{
        this.lobbies=lobbies
      })
    })
  }

  search(event){
    let q = event.target.value;
    this.startAt.next(q);
    this.endAt.next(q+ "\uf8ff")
  }

  firequery(start, end){
    return this.afs.collection('lobby',ref=>ref.limit(20).orderBy('lobbyname').startAt(start).endAt(end)).valueChanges();
  }

  selectVal(q) {
    this.showAlert("Chat room for "+q," is available for you to join!");
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

// sampleArr = [];
//   resultArr = [];
// search(event) {
//   let searchKey: string = event.target.value;
//   let firstLetter = searchKey.toUpperCase();
//   if(searchKey.length==0){
//     this.sampleArr=[];
//     this.resultArr=[];
//   }
//   if(this.sampleArr.length==0) {
//     this.afs.collection('lobby', ref => ref.where('lobbyname','==',firstLetter)).snapshotChanges().subscribe(data=>{
//       data.forEach(childData=>{
//         this.sampleArr.push(childData.payload.doc.data())
        
//       })
//     })
//   }
//   else {
//     this.resultArr=[];
//     this.sampleArr.forEach(val=>{
//       let name: string=val['lobbyname'];
//       if(name.toUpperCase().startsWith(searchKey.toUpperCase())){
//         if(true){
//           this.resultArr.push(val)
//         }
//       }
//     })
//   }
// }