import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormProvider } from  '../home/providers/form-provider';
import { HomePage } from "../home/home";


@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  startForm: FormGroup;
  submitAttempt: boolean = false;
  buttonDisabled: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public formProvider: FormProvider
  ){
    this.startForm = formBuilder.group({
      select: ['', Validators.required],
      city: ['', Validators.required]
    });

  }

  logEvent(e) {
    if(this.startForm.valid) {
      this.buttonDisabled = true;
    }
  }

  pushPage(){
    this.submitAttempt = true;
    if(this.startForm.valid) {
      this.navCtrl.push(HomePage);
      console.log(this.formProvider.get().select);
      console.log(this.formProvider.get().city);
    } else {
      console.log("error");
    }

  }
}
