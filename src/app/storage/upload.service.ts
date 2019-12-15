import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseFilePath: string = '/images';
  private filePath: string;


  constructor(private fbStorage: AngularFireStorage) { }

  uploadFile(file: File) {

    // this.filePath = '$this.baseFilePath/$file.name';
    this.filePath = this.baseFilePath + '/' + file.name;

    let uploadTask = this.fbStorage.ref(this.baseFilePath).child(this.filePath).put(file);

    uploadTask
    .then(() => {
      console.log('File upload Success')
    })
    .catch(error => {
      console.log(error);
    });
  }

  getFilePath() {
    return this.filePath;
  }

}
