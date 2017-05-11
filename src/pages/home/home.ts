import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormProvider } from  './providers/form-provider';
import { FormComponent } from './form-component/form.component';
import { SendProvider } from './services/send-services';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [FormComponent, SendProvider]
})
export class HomePage {
  public uniqueId = this.guid();
  constructor(
    storage: Storage,
    platform: Platform,
    public formProvider: FormProvider,
    ) {
    platform.ready().then((readySource) => {
        storage.get('userId').then((val) => {
        this.formProvider.getAll().uniqueId = val;
        console.log(this.uniqueId);
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
}
