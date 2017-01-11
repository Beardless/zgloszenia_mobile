import { Injectable } from '@angular/core';

@Injectable()
export class FormProvider {
  protected request = {
    name: '',
    email: '',
    message: '',
    uniqueId: ''
  };
  constructor(){
  }

  get(){
    return this.request;
  }

}
