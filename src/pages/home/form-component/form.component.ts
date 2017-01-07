import { Component } from '@angular/core';
import { FormProvider } from  './../providers/form-provider';

@Component({
  selector: 'form-component',
  templateUrl: 'form.component.html',
  providers: [FormProvider]
})
export class FormComponent {
  constructor(
    public formProvider: FormProvider
  ){

  }
}
