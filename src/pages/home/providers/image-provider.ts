import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastController, Platform, LoadingController, Loading } from 'ionic-angular';

declare var cordova: any;

@Injectable()
export class ImageProvider {
  images: Array<Object>=[];
  constructor(
    public sanitizer: DomSanitizer,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController
  ){}

  lastImage: string = null;
  loading: Loading;

  public getImages()
  {
      return this.images;
  }

  public remove(key)
  {
    this.images.splice(key, 1);
  };

  public add(image){
    if (image.substring(0,21) == "content://com.android") {
      let photo_split = image.split("%3A");
      image = "content://media/external/images/media/"+photo_split[1];
    }

    this.images[this.images.length] = {
      "orginal_path": image,
      "source": this.sanitizer.bypassSecurityTrustUrl(image),
      "contentType": "image/jpeg"
    };
    console.log(this.images);
  }

  public presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
