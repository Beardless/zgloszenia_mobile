import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FormComponent } from '../pages/home/form-component/form.component';
import { ImageComponent } from '../pages/home/image-component/image.component';
import { FormProvider } from "../pages/home/providers/form-provider";
import { ImageProvider } from '../pages/home/providers/image-provider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FormComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FormComponent
  ],
  providers: [
    ImageProvider,
    FormProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
