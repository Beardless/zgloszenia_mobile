import { Component } from '@angular/core';
import { Camera } from 'ionic-native';
import { ActionSheetController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public request = {
    name: '',
    email: '',
    message: '',
    uniqueId: ''
  };
  public uniqueId = this.guid();
  public images: Array<Object>=[null,null,null];
  constructor(
    storage: Storage,
    platform: Platform,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController) {

    platform.ready().then((readySource) => {
      storage.get('userId').then((val) => {
        this.request.uniqueId = val;
        if (null === val) {
          storage.set('userId', this.uniqueId);
        }
      })
    });
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  takePicture(sourceType, i){
    Camera.getPicture({
      sourceType: sourceType,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG
      // targetWidth: 1000,
      // targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.images[i] = {
        "source": "data:image/jpeg;base64," + imageData,
        "contentType": "image/jpeg"
      };
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
