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
    }

    upload(requestId){
        var image = this.imageProvider.getImages()[0];
        const fileTransfer = new Transfer();

        // Show Loading popup
        let loading = this.loadingCtrl.create({
            content: 'Wysyłanie...',
        });
        loading.present();

        fileTransfer.upload(image.filePath, "http://mockbin.org/bin/6acc292c-ff94-40bb-ab82-e804008639d8", {
            fileKey: "file",
            fileName: 'test_name',
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params : {'fileName': 'test_name'}
        }).then(data => {
            this.imageProvider.remove(0);

            if (this.imageProvider.getImages().length > 0){
                this.upload(requestId);
            }
            
            this.submitAttempt = false;
            loading.dismiss();
            console.log(data);
        }, err => {
            console.log(err);
        });
        console.log(fileTransfer);
    }

    send() {
        this.submitAttempt = true;
        if (this.sendForm.valid) {
            this.sendProvider.send(this.formProvider.get()).subscribe(
                data => {
                    this.formProvider.get().message = null;
                    this.formProvider.get().name = null;
                    this.formProvider.get().email = null;
                    this.formProvider.get().select = null;

                    if (this.imageProvider.getImages().length > 0){
                        this.upload(data.requestId);
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
