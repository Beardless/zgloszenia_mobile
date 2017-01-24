import { ActionSheetController } from 'ionic-angular';
import { Camera } from 'ionic-native';


export class ActionSheet {
  public base64Image: Array<string>=[];
  constructor(
    public actionSheetCtrl: ActionSheetController
  ){

  }
  takePicture(sourceType){
    Camera.getPicture({
      sourceType: sourceType,
      destinationType: Camera.DestinationType.DATA_URL
      // targetWidth: 1000,
      // targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image.push("data:image/jpeg;base64," + imageData);
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
}
