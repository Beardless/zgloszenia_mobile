import { Component, Injectable } from '@angular/core';
import { FormProvider } from  './../providers/form-provider';
import { SendProvider } from './../providers/send-provider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageProvider } from './../providers/image-provider';
import { Transfer } from 'ionic-native';
import { LoadingController } from 'ionic-angular';

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
        public formProvider: FormProvider,
        public sendProvider: SendProvider,
        public formBuilder: FormBuilder,
        public imageProvider: ImageProvider,
        public loadingCtrl: LoadingController
    ){
        this.sendForm = formBuilder.group({
            message: ['', Validators.required],
            name: [''],
            email: [''],
            select: ['']
        });

        // Show Loading popup
        this.loading = this.loadingCtrl.create({
            content: 'Wysyłanie...',
        });
    }

    upload(requestId){
        var image = this.imageProvider.getImages()[0];
        const fileTransfer = new Transfer();

        fileTransfer.upload(image.filePath, "http://reporter.24wspolnota.pl/request/"+requestId, {
            fileKey: "file",
            fileName: 'image'+this.imageProvider.getImages().length+'.jpg',
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params : {'fileName': 'test_name'}
        }).then(data => {
            this.imageProvider.remove(0);
            if (this.imageProvider.getImages().length > 0){
                this.upload(requestId);
            } else {
                this.sendProvider.sendMail(this.formProvider.get(), requestId).subscribe(
                  data => {
                    this.submitAttempt = false;
                    this.loading.dismiss();
                  }
                );
            }
        }, err => {
            this.loading.dismiss();
        });
    }

    send() {
        this.submitAttempt = true;
        if (this.sendForm.valid) {
            this.loading.present();
            this.sendProvider.send(this.formProvider.get()).subscribe(
                data => {
                    this.formProvider.get().message = '';
                    this.formProvider.get().name = null;
                    this.formProvider.get().email = null;
                    this.formProvider.get().select = null;

                    if (this.imageProvider.getImages().length > 0){
                        this.upload(data.requestId);
                    } else {
                        this.submitAttempt = false;
                        this.loading.dismiss();
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
