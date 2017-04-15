import { Component, Injectable } from '@angular/core';
import { Camera } from 'ionic-native';
import { ImageProvider } from "../providers/image-provider";
import { ActionSheetController } from 'ionic-angular';

@Injectable()
@Component({
  selector: 'image-component',
  templateUrl: 'image.component.html',
})

export class ImageComponent {
  constructor(
      public imageProvider: ImageProvider,
      public actionSheetCtrl: ActionSheetController,
      ){}

  takePicture(sourceType){
    let options = {
      sourceType: sourceType,
      destinationType: Camera.DestinationType.FILE_URI,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
    }

    Camera.getPicture(options).then((imageData) => {
      this.imageProvider.add(imageData);
    }, (err) => {
      this.imageProvider.presentToast('Wystąpił błąd podczas wybierania zdjęcia.');
    });
  }

  openMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Wybierz źródło zdjęć',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Aparat',
          icon: 'camera',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },{
          text: 'Galeria',
          icon: 'photos',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.SAVEDPHOTOALBUM);
          }
        },{
          text: 'Anuluj',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  modifyPhoto(key){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Zdecyduj co zrobić',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Usuń',
          icon: 'trash',
          handler: () => {
            this.imageProvider.remove(key);
          }
        },{
          text: 'Anuluj',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
