import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class FormProvider {
  submitAttempt: boolean = false;
  public request = {
    name: '',
    email: '',
    message: '',
    uniqueId: ''
  };
  requestForm: FormGroup;
  constructor(public formBuilder: FormBuilder){
    this.requestForm = formBuilder.group({
      message: ['', Validators.required],
      name: [''],
      email: ['']
    });
  }


}
