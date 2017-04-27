import { Component, Injectable } from '@angular/core';
import { Camera } from 'ionic-native';
import { ImageProvider } from "../providers/image-provider";
import { ActionSheetController } from 'ionic-angular';
import { HockeyApp } from 'ionic-hockeyapp';


@Injectable()
@Component({
  selector: 'image-component',
  templateUrl: 'image.component.html',
})

export class ImageComponent {
  constructor(
      public imageProvider: ImageProvider,
      public actionSheetCtrl: ActionSheetController,
      public hockeyApp: HockeyApp
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
            this.hockeyApp.trackEvent('Photo selected from Camera');
          }
        },{
          text: 'Galeria',
          icon: 'photos',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.SAVEDPHOTOALBUM);
            this.hockeyApp.trackEvent('Photo selected from PhotoAlbum');
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
