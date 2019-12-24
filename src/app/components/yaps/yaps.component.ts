import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-yaps',
  templateUrl: './yaps.component.html',
  styleUrls: ['./yaps.component.css']
})
export class YapsComponent implements OnInit {

  private yapDoc: AngularFirestoreCollection<any>;
  public yaps: Observable<any[]>;
  public name: string;
  public date: string;
  public yap: string;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.yaps = this.db.collection('yaps').valueChanges(); 
  }

}