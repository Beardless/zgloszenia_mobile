import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormProvider } from  './providers/form-provider';
import { ImageProvider } from './providers/image-provider';
import { FormComponent } from './form-component/form.component';
import { SendProvider } from './providers/send-provider';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ImageProvider, FormComponent, SendProvider]
})
export class HomePage {
  public uniqueId = this.guid();
  constructor(
    storage: Storage,
    platform: Platform,
    public formProvider: FormProvider,
    public imageProvider: ImageProvider,
    public formComponent: FormComponent,
    public sendProvider: SendProvider
    ) {
    platform.ready().then((readySource) => {
      storage.get('userId').then((val) => {
        this.formProvider.get().uniqueId = val;
        if (null === val) {
          storage.set('userId', this.formProvider.get().uniqueId);
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

  // send(data) {
  //   console.log(this.formProvider);
  //   this.sendProvider.send(data).subscribe(
  //     data => {
  //       console.log(data);
  //       return true;
  //     },
  //     error => {
  //       console.error("Error");
  //       return Observable.throw(error);
  //     }
  //   );
  //
  // }

}
