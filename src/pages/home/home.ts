import { Component } from '@angular/core';
import { Camera } from 'ionic-native';
import { ActionSheetController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  requestForm: FormGroup;
  submitAttempt: boolean = false;
  public request = {
    name: '',
    email: '',
    message: '',
    uniqueId: ''
  };
  public uniqueId = this.guid();
  public images: Array<Object>=[];
  constructor(
    storage: Storage,
    platform: Platform,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public formBuilder: FormBuilder) {

    this.requestForm = formBuilder.group({
      message: ['', Validators.required],
      name: [''],
      email: ['']
    });

    platform.ready().then((readySource) => {
      storage.get('userId').then((val) => {
        this.request.uniqueId = val;
        if (null === val) {
          storage.set('userId', this.uniqueId);
        }
      })
    });
  }

  send(){
    this.submitAttempt = true;

    if(this.requestForm.valid){
      console.log("success!")
      console.log(this.requestForm.value);
    }
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  takePicture(sourceType){
    Camera.getPicture({
      sourceType: sourceType,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG
      // targetWidth: 1000,
      // targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.images[this.images.length] = {
        "source": "data:image/jpeg;base64," + imageData,
        "contentType": "image/jpeg"
      };
      console.log(sourceType);
      console.log(this.images);
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
            this.images.splice(key, 1);
            console.log(this.images)
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
