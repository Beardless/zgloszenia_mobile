import { Component } from '@angular/core';
import { Camera } from 'ionic-native';
import { ActionSheetController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public request = {
    name: '',
    email: '',
    message: ''
  };
  public images: Array<string>=[null,null,null];
  constructor(platform: Platform, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {
    platform.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      // Platform now ready, execute any required native code
    });
  }

  takePicture(sourceType, i){
    Camera.getPicture({
      sourceType: sourceType,
      destinationType: Camera.DestinationType.DATA_URL
      // targetWidth: 1000,
      // targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.images[i] = "data:image/jpeg;base64," + imageData;
      console.log(sourceType, i);
      console.log(this.images);
    }, (err) => {
      console.log(err);
    });
  }

  openMenu(i) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Aparat',
          icon: 'camera',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA, i);
          }
        },{
          text: 'Galeria',
          icon: 'photos',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.SAVEDPHOTOALBUM, i);
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
            delete this.images[key];
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
