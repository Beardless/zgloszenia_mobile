import { Component, Injectable } from '@angular/core';
import { FormProvider } from  './../providers/form-provider';
import { SendProvider } from './../providers/send-provider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageProvider } from './../providers/image-provider';
import { Observable } from "rxjs/Rx";
import { Transfer, FilePath } from 'ionic-native';
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
          var url = "http://mockbin.org/bin/8b455293-429e-41da-9fd4-a1ac2f788405";
          const fileTransfer = new Transfer();

          let loading = this.loadingCtrl.create({
            content: 'Uploading...',
          });
          loading.present();
          console.log(this.imageProvider.getImages());
          this.imageProvider.getImages().forEach(function (image) {
              console.log(image);
              FilePath.resolveNativePath(image['orginal_path'])
              .then(filePath => {
                console.log(filePath);
                fileTransfer.upload(filePath, url, {
                  fileKey: "file",
                  fileName: 'test_name',
                  chunkedMode: false,
                  mimeType: "multipart/form-data",
                  params : {'fileName': 'test_name'}
                }).then(data => {
                  console.log(data);
                  loading.dismiss()
                  // this.imageProvider.presentToast('Image succesful uploaded.');
                }, err => {
                  // this.imageProvider.loading.dismissAll()
                  console.log(err);
                  // this.imageProvider.presentToast('Error while uploading file.');
                });
              })
          });
        },
        error => {
          console.log(error);
          return Observable.throw(error)
        }
      );
    }
    else {
      console.log("error");
    }
  }

}
