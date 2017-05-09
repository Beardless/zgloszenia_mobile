import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { FormProvider } from  '../home/providers/form-provider';
import { HomePage } from "../home/home";


@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  startForm: FormGroup;
  submitAttempt: boolean = false;
  buttonDisabled: boolean = true;
  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public formProvider: FormProvider
  ){
    this.startForm = formBuilder.group({
      select: [this.formProvider.get('select'), Validators.required],
      city: [this.formProvider.get('city'), Validators.required]
    });

    this.storage.get('city').then((val) => {
      if (null !== val) {
        this.startForm.setValue({'city': val, 'select': this.formProvider.get('select')});
      }

      if (this.startForm.valid){
        this.buttonDisabled = false;
      }
    })

  }

  logEvent(e) {
    if(this.startForm.valid) {
      this.buttonDisabled = false;
    }
  }

  pushPage(){
    this.submitAttempt = true;
    if(this.startForm.valid) {
      this.navCtrl.push(HomePage);
      console.log(this.formProvider.get('select'));
      console.log(this.formProvider.get('city'));
      console.log(this.startForm.value.city);
      this.storage.set('city', this.startForm.value.city);
    } else {
      console.log("error");
    }

  }
}
