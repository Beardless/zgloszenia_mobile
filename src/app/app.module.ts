import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FormComponent } from '../pages/home/form-component/form.component';
import { ImageComponent } from '../pages/home/image-component/image.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FormComponent,
    ImageComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
