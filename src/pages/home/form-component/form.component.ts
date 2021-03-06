import { Component, Injectable } from '@angular/core';
import { FormProvider } from  './../providers/form-provider';
import { SendProvider } from './../providers/send-provider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ImageProvider } from './../providers/image-provider';
import { Transfer } from 'ionic-native';
import { LoadingController, AlertController } from 'ionic-angular';
import { HockeyApp } from 'ionic-hockeyapp';

@Component({
    selector: 'form-component',
    templateUrl: 'form.component.html',
    styles: [`
        .alert{
            color: #f53d3d;
        }
        .invalid
        {
            border: 1px solid #f53d3d;
        }
        .bottom_bar
        {
            position: fixed;
            height: 56px;
            width: 100%;
            background: #fff;
            border-top: 1px solid #ccc;
        }
        .item item-block item-md item-select
        {
            padding-top:8px;
        }
    `]
})
@Injectable()
export class FormComponent {
    sendForm: FormGroup;
    submitAttempt: boolean = false;
    loading: any;

    constructor(
        public storage: Storage,
        public formProvider: FormProvider,
        public sendProvider: SendProvider,
        public formBuilder: FormBuilder,
        public imageProvider: ImageProvider,
        public loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        public hockeyApp: HockeyApp
    ){
        this.sendForm = formBuilder.group({
            message: [this.formProvider.get().message, Validators.required],
            name: [this.formProvider.get().name],
            email: [this.formProvider.get().email]
        });

        this.loading = this.loadingCtrl.create({
            content: 'Wysyłanie...',
        });

        this.storage.get('name').then((val) => {
          if (null !== val) {
              this.sendForm.patchValue({name: val});
          }
        });

        this.storage.get('email').then((val) => {
          if (null !== val) {
            this.sendForm.patchValue({email: val});
          }
        })
    }

    presentAlert() {
      let alert = this.alertCtrl.create({
        title: 'Dziękujemy',
        subTitle: 'Dziękujemy Twoje zgłoszenie zostało dostarczone do redakcji',
        buttons: ['OK']
      });
      alert.present();
    }

    upload(requestId){
        var image = this.imageProvider.getImages()[0];
        const fileTransfer = new Transfer();

        fileTransfer.upload(image.filePath, "https://reporter.24wspolnota.pl/request/"+requestId, {
            fileKey: "file",
            fileName: 'image'+this.imageProvider.getImages().length+'.jpg',
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params : {'fileName': 'test_name'}
        }).then(data => {
            this.imageProvider.remove(0);
            this.hockeyApp.trackEvent('Send photo');
            if (this.imageProvider.getImages().length > 0){
                this.upload(requestId);
            } else {
                this.sendProvider.sendMail(this.formProvider.get(), requestId).subscribe(
                  data => {
                    this.submitAttempt = false;
                    this.loading.dismiss().catch(() => {});
                    this.presentAlert();
                    this.hockeyApp.trackEvent('Send email');
                    this.formProvider.get().message = '';
                  }
                );
            }
        }, err => {
          this.loading.dismiss().catch(() => {});
        });
    }

    send() {
        this.submitAttempt = true;
        if (this.sendForm.valid) {
            this.storage.set('name', this.formProvider.get().name);
            this.storage.set('email', this.formProvider.get().email);
            this.loading.present().catch(() => {});
            this.sendProvider.send(this.formProvider.get()).subscribe(
                data => {
                    this.hockeyApp.trackEvent('Send request');
                    if (this.imageProvider.getImages().length > 0){
                        this.upload(data.requestId);
                    } else {
                        this.sendProvider.sendMail(this.formProvider.get(), data.requestId).subscribe(
                          data => {
                            this.submitAttempt = false;
                            this.loading.dismiss().catch(() => {});
                            this.presentAlert();
                            this.hockeyApp.trackEvent('Send email');
                            this.formProvider.get().message = '';
                          }
                        );
                    }
                },
                error => {
                    console.log(error);
                }
            );
        } else {
            console.log("error");
        }
    }
}
