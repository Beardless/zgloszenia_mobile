import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { StartPage } from '../pages/start/start';
import { HockeyApp } from 'ionic-hockeyapp';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = StartPage;

  constructor(
    platform: Platform,
    private hockeyapp:HockeyApp
    ) {
    platform.ready().then(() => {
      let androidAppId = 'a3aef6e9a0154ab881ffdd0f97e853c4';
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.hockeyapp.start(androidAppId, null, true, true);
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
