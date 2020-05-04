import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UploadService } from '../storage/upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;

  private file: File | null = null;

  constructor(private auth: AuthService, private db: AngularFirestore, private upload: UploadService) { }

  ngOnInit() {
  }

  yapForm = new FormGroup({
    yap: new FormControl('')
  });

  postYap() {

    let user = this.auth.getUser();

    if (this.file){
      this.uploadFile(this.file);
    }


    // TODO Previous URL is getting used.
    // TODO Yap is getting posted before image
    this.db.collection('yaps').add({
      yap: this.yapForm.get('yap').value,
      name: user.displayName,
      date: Date(),
      timePosted: Date.now(), 
      uid: user.uid,
      imageURL: this.upload.getDownloadURL()
    });

    console.log("sent yap to firestore");

    // Clear Form Input and File Input
    this.yapForm.reset();
    this.fileInput.nativeElement.value = null;
    this.file = null;


  }

  handleFile(event) {
    const file = event.target.files[0];
    this.file = file;
    console.log('Handled file with name: ' + this.file.name);
  }

  uploadFile(file: File) {
    this.upload.uploadFile(file);
  }

}
