import { Component, Injectable } from '@angular/core';
import { FormProvider } from  './../providers/form-provider';
import { SendProvider } from './../providers/send-provider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Observable} from "rxjs/Rx";


@Component({
  selector: 'form-component',
  templateUrl: 'form.component.html',
  providers: [ SendProvider],
  styles: [`
    .alert{
      color: #ea6153;
    }
    .invalid {
          border: 1px solid #ea6153;
      }
    .bottom_bar
    {
      position: fixed;
      height: 6vh;
      width: 100%;
      background: #ED4248;
      border-top: 1px solid #ccc;
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
    public formBuilder: FormBuilder
  ){
    this.sendForm = formBuilder.group({
      message: ['', Validators.required],
      name: [''],
      email: ['']
    });
  }

  send() {
    this.submitAttempt = true;
    if(!this.sendForm.valid){
      console.log("success!")
      console.log(this.sendForm.value);
    }
    console.log(this.formProvider);
    this.sendProvider.send(this.formProvider.get()).subscribe(
      data => {
        this.formProvider.get().message = null;
        this.formProvider.get().name = null;
        this.formProvider.get().email = null;
        console.log(data);
        return true;
      },
      error => {
        console.error("Error");
        return Observable.throw(error);
      }
    );

  }


}
