import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  constructor(private db: AngularFireDatabase) { }
  
  getPlotNumbers() {
    return this.db.list('/plots').valueChanges();
  }
  addCredit(credit: any, plotNum: string, memNum: string) {
    this.db.database.ref(`plots/${plotNum}-${memNum}/credits`).push(credit)
    .then(_ => {
      console.log('credit pushed');
    }).catch(err => {
      console.log(err);
    });
  }
}
