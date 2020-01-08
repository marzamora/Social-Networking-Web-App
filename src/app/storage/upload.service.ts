// DOCS: https://firebase.google.com/docs/storage/web/upload-files

import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private task: AngularFireUploadTask;

  public downloadURL: string = "";
  
  // private imagesRef: any = this.storageRef.child('images');

  constructor(private storage: AngularFireStorage, private auth: AuthService) { }

  uploadFile(file: File) {

    let path = `images/${file.name}`;

    let imgRef = this.storage.ref(path);

    let uploadTask = imgRef.put(file)
    
    uploadTask.then(snapshot => {
      console.log('Successfully uploaded image.');
    }); 

    uploadTask.task.snapshot.ref.getDownloadURL().then( (downloadURL) => {
      this.downloadURL = downloadURL;
    });
  }

  getDownloadURL() {
    return this.downloadURL;
  }

}
