import { Component } from '@angular/core';
import { Camera } from 'ionic-native';
import { ImageProvider } from "../providers/image-provider";
import { ActionSheetController } from 'ionic-angular';


@Component({
  selector: 'image-component',
  templateUrl: 'image.component.html',
  providers: [ImageProvider]
})
export class ImageComponent {
  constructor(
      public imageProvider: ImageProvider,
      public actionSheetCtrl: ActionSheetController
  ){}

  takePicture(sourceType){
    Camera.getPicture({
      sourceType: sourceType,
      destinationType: Camera.DestinationType.FILE_URI,
      encodingType: Camera.EncodingType.JPEG
      //targetWidth: 150,
      //targetHeight: 300
    }).then((imageData) => {
      this.imageProvider.add(imageData);
    }, (err) => {
      console.log(err);
    });
  }

  openMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
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
      title: 'Modify your album',
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
