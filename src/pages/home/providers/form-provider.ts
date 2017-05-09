import { Injectable } from '@angular/core';
import { ImageProvider } from './image-provider';

@Injectable()
export class FormProvider {
  protected request = {
    name: '',
    email: '',
    message: '',
    select: 'Temat na artykuł',
    uniqueId: '',
    city: '',
  };

  constructor(public imageProvider: ImageProvider){
  }

  getAll(){
    return this.request;
  }

  get (name){
    return this.request[name];
  };

  set (name, value){
      this.request[name] = value;
  }

}
