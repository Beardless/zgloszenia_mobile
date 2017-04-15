import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastController, Platform} from 'ionic-angular';
import { FilePath, File } from 'ionic-native';

declare var cordova: any;

@Injectable()
export class ImageProvider {

  protected images: Array<any>=[];

  constructor(
    public sanitizer: DomSanitizer,
    public toastCtrl: ToastController,
    public platform: Platform
  ){}

  lastImage: string = null

  public getImages()
  {
      return this.images;
  }

  public remove(key)
  {
    this.images.splice(key, 1);
  };

  public add(image)
  {
    FilePath.resolveNativePath(image)
        .then(path => {
          File.resolveLocalFilesystemUrl(path)
              .then((fileEntry: any) => {
                  this.images[this.images.length] = {
                      "orginal_path": image,
                      "source": this.sanitizer.bypassSecurityTrustUrl(image),
                      "contentType": "image/jpeg",
                      "fileEntry": fileEntry,
                      "filePath": path
                  };
                  console.log(this.images);
              })
              .catch(e => {
                console.error(e);
              })
        })
        .catch(e => {
          console.error('Houston, we have a big problem :(', e);
        });
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
