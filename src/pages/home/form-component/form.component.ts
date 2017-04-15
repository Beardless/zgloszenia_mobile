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

    upload(images){
        var image = images[0];
        const fileTransfer = new Transfer();
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
            console.log('data', data);
            console.log('imageProvider', this.imageProvider.getImages(), this.imageProvider.getImages().length);
            this.imageProvider.remove(0);
            if (this.imageProvider.getImages().length > 0){
                console.log('after remove', this.imageProvider.getImages());
                this.upload(this.imageProvider.getImages());
            } else {
                console.log('done');
                this.submitAttempt = false;
                loading.dismiss();

                // POST with info about end of files
            }
        }, err => {
            console.log(err);
        });
    }

    send() {
        this.submitAttempt = true;
        if (this.sendForm.valid) {
            console.log(this.formProvider.get());
            this.sendProvider.send(this.formProvider.get()).subscribe(
                data => {
                    this.formProvider.get().message = null;
                    this.formProvider.get().name = null;
                    this.formProvider.get().email = null;
                    this.formProvider.get().select = null;

                    this.upload(this.imageProvider.getImages());
                },
                error => {
                    console.log(error);
                }
            );
            console.log('send first image');
        } else {
            console.log("error");
        }
    }
}

/**
 *
 * POST /zgloszenia
 *
 *  formularz z danymi zgłoszenia
 *  w odpowiedzi zwracasz ID zgłoszenia
 *
 * POST /zgloszenia/{id}
 *
 *  zdjęcia do tego zgłoszenia
 *
 * POST /zgloszenia/{id}/send
 *
 *  server tworzy maila i wysyła go na ustalony adres
 *
 *
 */
