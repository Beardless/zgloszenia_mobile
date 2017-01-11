import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FormComponent } from '../pages/home/form-component/form.component';
import { ImageComponent } from '../pages/home/image-component/image.component';
import {FormProvider} from "../pages/home/providers/form-provider";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FormComponent,
    ImageComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FormComponent
  ],
  providers: [
    FormProvider,
    Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
