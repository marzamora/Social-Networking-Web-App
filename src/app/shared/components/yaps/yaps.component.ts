import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { yaps } from '../../models/yaps.model';

@Component({
  selector: 'app-yaps',
  templateUrl: './yaps.component.html',
  styleUrls: ['./yaps.component.css']
})
export class YapsComponent implements OnInit {

  public yapsCollectionRef: AngularFirestoreCollection<yaps>;
  public yaps$: Observable<yaps[]>;
  // public sortedPosts: Observable<any[]>;
  public name: string;
  public date: string;
  public yap: string;

  constructor(private db: AngularFirestore) {

    this.yapsCollectionRef = db.collection<yaps>('yaps', ref => ref.orderBy('timePosted', 'desc'));
    this.yaps$ = this.yapsCollectionRef.valueChanges();

   }

  ngOnInit() {

    // this.yaps = this.db.collection("yaps").orderBy("date", "asc");

    // this.yaps = this.db.collection('yaps').valueChanges();
    // this.yaps = this.db.collection("yaps").orderBy("date","asc");
    // this.sortedPosts = this.db.collection('yaps').valueChanges(); 

    // this.yapDoc = this.db.collection('yaps');

  }

}