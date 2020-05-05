// DOCS: https://firebase.google.com/docs/storage/web/upload-files

import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private downloadURL: String = "";
  // private imagesRef: any = this.storageRef.child('images');

  constructor(private storage: AngularFireStorage, private auth: AuthService) { }

  uploadFile(file: File) {

    let path = `images/${file.name}`;

    let imgRef = this.storage.ref(path);

    let uploadTask = imgRef.put(file)
    
    uploadTask.then(snapshot => {
      console.log('Successfully uploaded image.');
      snapshot.ref.getDownloadURL().then( (downloadURL) => {
        this.downloadURL = downloadURL;
      });
    }); 

    return uploadTask;
  }

  // ! Deprecated for now. Don't need it.
  getDownloadURL() {
    return this.downloadURL;
  }

}
