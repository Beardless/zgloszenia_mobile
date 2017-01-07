import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormProvider } from  './providers/form-provider';
import { ImageProvider } from './providers/image-provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [FormProvider, ImageProvider]
})
export class HomePage {
  public uniqueId = this.guid();
  constructor(
    storage: Storage,
    platform: Platform,
    public formProvider: FormProvider,
    public imageProvider: ImageProvider
    ) {
    platform.ready().then((readySource) => {
      storage.get('userId').then((val) => {
        this.formProvider.request.uniqueId = val;
        if (null === val) {
          storage.set('userId', this.formProvider.request.uniqueId);
        }
      })
    });
  }

  send(){
    this.formProvider.submitAttempt = true;

    if(this.formProvider.requestForm.valid){
      console.log("success!");
      console.log(this.formProvider.requestForm);
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

}
