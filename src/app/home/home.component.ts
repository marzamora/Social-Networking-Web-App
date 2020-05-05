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
  private yapText: String = "";

  constructor(private auth: AuthService, private db: AngularFirestore, private upload: UploadService) { }

  ngOnInit() {
  }

  yapForm = new FormGroup({
    yap: new FormControl('')
  });

  postYap() {

    this.yapText = this.yapForm.get('yap').value;

    if (this.file){
      this.uploadFile(this.file).then( snapshot => {
        snapshot.ref.getDownloadURL().then( (downloadURL) => {
          // this.downloadURL = downloadURL;
          this.uploadPostData(downloadURL);
        });
      });
    } else {      
      this.uploadPostData("");
    }
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
    return this.upload.uploadFile(file);
  }

  uploadPostData(downloadURL?: String) {
    let userData = this.auth.getCurrentUserData();
    this.db.collection('yaps').add({
      yap: this.yapText,
      name: userData.displayName,
      date: Date(),
      timePosted: Date.now(), 
      uid: userData.uid,
      imageURL: downloadURL
    });
  }

}
